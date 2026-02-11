import { Tables } from "@/supabase/types"
import { ChatPayload, MessageImage } from "@/types"
import { encode } from "gpt-tokenizer"
import { getBase64FromDataURL, getMediaTypeFromDataURL } from "@/lib/utils"

// 模型名称映射表
const MODEL_NAME_MAP: Record<string, string> = {
  // Claude 4 系列
  "claude-4-sonnet": "Claude 4 Sonnet",
  "claude-4-5-sonnet": "Claude 4.5 Sonnet",
  "claude-4-5-sonnet-thinking": "Claude 4.5 Sonnet Thinking",
  "claude-4-5-opus": "Claude 4.5 Opus",
  "claude-4-6-opus-high": "Claude 4.6 Opus High",
  "claude-4-5-opus-thinking": "Claude 4.5 Opus Thinking",
  "claude-4-6-opus-max": "Claude 4.6 Opus Max",
  "claude-4-5-haiku": "Claude 4.5 Haiku",
  // Gemini 系列
  "gemini-2-5-pro": "Gemini 2.5 Pro",
  "gemini-3-pro": "Gemini 3 Pro",
  // GPT-5 系列
  "gpt-5-low": "GPT-5 Low",
  "gpt-5-medium": "GPT-5 Medium",
  "gpt-5-high": "GPT-5 High",
  // GPT-5.1 系列
  "gpt-5-1-low": "GPT-5.1 Low",
  "gpt-5-1-medium": "GPT-5.1 Medium",
  "gpt-5-1-high": "GPT-5.1 High",
  // GPT-5.1 Codex 系列
  "gpt-5-1-codex-low": "GPT-5.1 Codex Low",
  "gpt-5-1-codex-medium": "GPT-5.1 Codex Medium",
  "gpt-5-1-codex-high": "GPT-5.1 Codex High",
  "gpt-5-1-codex-max-low": "GPT-5.1 Codex Max Low"
}

const buildBasePrompt = (
  prompt: string,
  profileContext: string,
  workspaceInstructions: string,
  assistant: Tables<"assistants"> | null,
  modelId: string // 新增模型 ID 参数
) => {
  let fullPrompt = ""

  // ===== 新增: 模型身份识别 =====
  const modelName = MODEL_NAME_MAP[modelId] || modelId
  fullPrompt += `<MODEL IDENTITY>\nYou are ${modelName}.\nWhen users ask what model you are, you must answer: "I am ${modelName}".\nDo not claim to be any other model.\n</MODEL IDENTITY>\n\n`
  // ===== 新增结束 =====

  if (assistant) {
    fullPrompt += `<INJECT ROLE>\nYou are not an AI. You are ${assistant.name}.\n</INJECT ROLE>\n\n`
  }

  fullPrompt += `Today is ${new Date().toLocaleDateString()}.\n\n`

  if (profileContext) {
    fullPrompt += `User Info:\n${profileContext}\n\n`
  }

  if (workspaceInstructions) {
    fullPrompt += `System Instructions:\n${workspaceInstructions}\n\n`
  }

  fullPrompt += `User Instructions:\n${prompt}`

  return fullPrompt
}

export async function buildFinalMessages(
  payload: ChatPayload,
  profile: Tables<"profiles">,
  chatImages: MessageImage[]
) {
  const {
    chatSettings,
    workspaceInstructions,
    chatMessages,
    assistant,
    messageFileItems,
    chatFileItems
  } = payload

  const BUILT_PROMPT = buildBasePrompt(
    chatSettings.prompt,
    chatSettings.includeProfileContext ? profile.profile_context || "" : "",
    chatSettings.includeWorkspaceInstructions ? workspaceInstructions : "",
    assistant,
    chatSettings.model // 传入模型 ID
  )

  const CHUNK_SIZE = chatSettings.contextLength
  const PROMPT_TOKENS = encode(chatSettings.prompt).length

  let remainingTokens = CHUNK_SIZE - PROMPT_TOKENS

  let usedTokens = 0
  usedTokens += PROMPT_TOKENS

  const processedChatMessages = chatMessages.map((chatMessage, index) => {
    const nextChatMessage = chatMessages[index + 1]

    if (nextChatMessage === undefined) {
      return chatMessage
    }

    const nextChatMessageFileItems = nextChatMessage.fileItems

    if (nextChatMessageFileItems.length > 0) {
      const findFileItems = nextChatMessageFileItems
        .map(fileItemId =>
          chatFileItems.find(chatFileItem => chatFileItem.id === fileItemId)
        )
        .filter(item => item !== undefined) as Tables<"file_items">[]

      const retrievalText = buildRetrievalText(findFileItems)

      return {
        message: {
          ...chatMessage.message,
          content:
            `${chatMessage.message.content}\n\n${retrievalText}` as string
        },
        fileItems: []
      }
    }

    return chatMessage
  })

  let finalMessages = []

  for (let i = processedChatMessages.length - 1; i >= 0; i--) {
    const message = processedChatMessages[i].message
    const messageTokens = encode(message.content).length

    if (messageTokens <= remainingTokens) {
      remainingTokens -= messageTokens
      usedTokens += messageTokens
      finalMessages.unshift(message)
    } else {
      break
    }
  }

  let tempSystemMessage: Tables<"messages"> = {
    chat_id: "",
    assistant_id: null,
    content: BUILT_PROMPT,
    created_at: "",
    id: processedChatMessages.length + "",
    image_paths: [],
    model: payload.chatSettings.model,
    role: "system",
    sequence_number: processedChatMessages.length,
    updated_at: "",
    user_id: ""
  }

  finalMessages.unshift(tempSystemMessage)

  finalMessages = finalMessages.map(message => {
    let content

    if (message.image_paths.length > 0) {
      content = [
        {
          type: "text",
          text: message.content
        },
        ...message.image_paths.map(path => {
          let formedUrl = ""

          if (path.startsWith("data")) {
            formedUrl = path
          } else {
            const chatImage = chatImages.find(image => image.path === path)

            if (chatImage) {
              formedUrl = chatImage.base64
            }
          }

          return {
            type: "image_url",
            image_url: {
              url: formedUrl
            }
          }
        })
      ]
    } else {
      content = message.content
    }

    return {
      role: message.role,
      content
    }
  })

  if (messageFileItems.length > 0) {
    const retrievalText = buildRetrievalText(messageFileItems)

    finalMessages[finalMessages.length - 1] = {
      ...finalMessages[finalMessages.length - 1],
      content: `${
        finalMessages[finalMessages.length - 1].content
      }\n\n${retrievalText}`
    }
  }

  return finalMessages
}

function buildRetrievalText(fileItems: Tables<"file_items">[]) {
  const retrievalText = fileItems
    .map(item => `<BEGIN SOURCE>\n${item.content}\n</END SOURCE>`)
    .join("\n\n")

  return `You may use the following sources if needed to answer the user's question. If you don't know the answer, say "I don't know."\n\n${retrievalText}`
}

function adaptSingleMessageForGoogleGemini(message: any) {

  let adaptedParts = []

  let rawParts = []
  if(!Array.isArray(message.content)) {
    rawParts.push({type: 'text', text: message.content})
  } else {
    rawParts = message.content
  }

  for(let i = 0; i < rawParts.length; i++) {
    let rawPart = rawParts[i]

    if(rawPart.type == 'text') {
      adaptedParts.push({text: rawPart.text})
    } else if(rawPart.type === 'image_url') {
      adaptedParts.push({
        inlineData: {
          data: getBase64FromDataURL(rawPart.image_url.url),
          mimeType: getMediaTypeFromDataURL(rawPart.image_url.url),
        }
      })
    }
  }

  let role = 'user'
  if(["user", "system"].includes(message.role)) {
    role = 'user'
  } else if(message.role === 'assistant') {
    role = 'model'
  }

  return {
    role: role,
    parts: adaptedParts
  }
}

function adaptMessagesForGeminiVision(
  messages: any[]
) {
  // Gemini Pro Vision cannot process multiple messages
  // Reformat, using all texts and last visual only

  const basePrompt = messages[0].parts[0].text
  const baseRole = messages[0].role
  const lastMessage = messages[messages.length-1]
  const visualMessageParts = lastMessage.parts;
  let visualQueryMessages = [{
    role: "user",
    parts: [
      `${baseRole}:\n${basePrompt}\n\nuser:\n${visualMessageParts[0].text}\n\n`,
      visualMessageParts.slice(1)
    ]
  }]
  return visualQueryMessages
}

export async function adaptMessagesForGoogleGemini(
  payload: ChatPayload,
  messages:  any[]
) {
  let geminiMessages = []
  for (let i = 0; i < messages.length; i++) {
    let adaptedMessage = adaptSingleMessageForGoogleGemini(messages[i])
    geminiMessages.push(adaptedMessage)
  }

  if(payload.chatSettings.model === "gemini-pro-vision") {
    geminiMessages = adaptMessagesForGeminiVision(geminiMessages)
  }
  return geminiMessages
}

