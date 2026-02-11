import { LLM } from "@/types"

const CUSTOM_PLATFORM_LINK = "http://35.72.12.242:8000/warp/v1"

// 自定义服务器模型列表
// 服务器地址: http://35.72.12.242:8000/warp/v1
// API 格式: OpenAI (所有模型统一使用 OpenAI 格式调用)
// 认证方式: Authorization: Bearer sk-kiro2api
// Provider: openai (使用 OpenAI 路由，避免 UUID 验证问题)

// Claude 4 系列
const CLAUDE_4_SONNET: LLM = {
  modelId: "claude-4-sonnet",
  modelName: "Claude 4 Sonnet",
  provider: "openai",
  hostedId: "claude-4-sonnet",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_5_SONNET: LLM = {
  modelId: "claude-4-5-sonnet",
  modelName: "Claude 4.5 Sonnet",
  provider: "openai",
  hostedId: "claude-4-5-sonnet",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_5_SONNET_THINKING: LLM = {
  modelId: "claude-4-5-sonnet-thinking",
  modelName: "Claude 4.5 Sonnet Thinking",
  provider: "openai",
  hostedId: "claude-4-5-sonnet-thinking",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_5_OPUS: LLM = {
  modelId: "claude-4-5-opus",
  modelName: "Claude 4.5 Opus",
  provider: "openai",
  hostedId: "claude-4-5-opus",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_6_OPUS_HIGH: LLM = {
  modelId: "claude-4-6-opus-high",
  modelName: "Claude 4.6 Opus High",
  provider: "openai",
  hostedId: "claude-4-6-opus-high",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_5_OPUS_THINKING: LLM = {
  modelId: "claude-4-5-opus-thinking",
  modelName: "Claude 4.5 Opus Thinking",
  provider: "openai",
  hostedId: "claude-4-5-opus-thinking",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_6_OPUS_MAX: LLM = {
  modelId: "claude-4-6-opus-max",
  modelName: "Claude 4.6 Opus Max",
  provider: "openai",
  hostedId: "claude-4-6-opus-max",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_4_5_HAIKU: LLM = {
  modelId: "claude-4-5-haiku",
  modelName: "Claude 4.5 Haiku",
  provider: "openai",
  hostedId: "claude-4-5-haiku",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

// Gemini 系列
const GEMINI_2_5_PRO: LLM = {
  modelId: "gemini-2-5-pro",
  modelName: "Gemini 2.5 Pro",
  provider: "openai",
  hostedId: "gemini-2-5-pro",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const GEMINI_3_PRO: LLM = {
  modelId: "gemini-3-pro",
  modelName: "Gemini 3 Pro",
  provider: "openai",
  hostedId: "gemini-3-pro",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

// GPT-5 系列
const GPT_5_LOW: LLM = {
  modelId: "gpt-5-low",
  modelName: "GPT-5 Low",
  provider: "openai",
  hostedId: "gpt-5-low",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const GPT_5_MEDIUM: LLM = {
  modelId: "gpt-5-medium",
  modelName: "GPT-5 Medium",
  provider: "openai",
  hostedId: "gpt-5-medium",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const GPT_5_HIGH: LLM = {
  modelId: "gpt-5-high",
  modelName: "GPT-5 High",
  provider: "openai",
  hostedId: "gpt-5-high",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

// GPT-5.1 系列
const GPT_5_1_LOW: LLM = {
  modelId: "gpt-5-1-low",
  modelName: "GPT-5.1 Low",
  provider: "openai",
  hostedId: "gpt-5-1-low",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const GPT_5_1_MEDIUM: LLM = {
  modelId: "gpt-5-1-medium",
  modelName: "GPT-5.1 Medium",
  provider: "openai",
  hostedId: "gpt-5-1-medium",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

const GPT_5_1_HIGH: LLM = {
  modelId: "gpt-5-1-high",
  modelName: "GPT-5.1 High",
  provider: "openai",
  hostedId: "gpt-5-1-high",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: true
}

// GPT-5.1 Codex 系列
const GPT_5_1_CODEX_LOW: LLM = {
  modelId: "gpt-5-1-codex-low",
  modelName: "GPT-5.1 Codex Low",
  provider: "openai",
  hostedId: "gpt-5-1-codex-low",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: false
}

const GPT_5_1_CODEX_MEDIUM: LLM = {
  modelId: "gpt-5-1-codex-medium",
  modelName: "GPT-5.1 Codex Medium",
  provider: "openai",
  hostedId: "gpt-5-1-codex-medium",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: false
}

const GPT_5_1_CODEX_HIGH: LLM = {
  modelId: "gpt-5-1-codex-high",
  modelName: "GPT-5.1 Codex High",
  provider: "openai",
  hostedId: "gpt-5-1-codex-high",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: false
}

const GPT_5_1_CODEX_MAX_LOW: LLM = {
  modelId: "gpt-5-1-codex-max-low",
  modelName: "GPT-5.1 Codex Max Low",
  provider: "openai",
  hostedId: "gpt-5-1-codex-max-low",
  platformLink: CUSTOM_PLATFORM_LINK,
  imageInput: false
}

export const CUSTOM_LLM_LIST: LLM[] = [
  CLAUDE_4_SONNET,
  CLAUDE_4_5_SONNET,
  CLAUDE_4_5_SONNET_THINKING,
  CLAUDE_4_5_OPUS,
  CLAUDE_4_6_OPUS_HIGH,
  CLAUDE_4_5_OPUS_THINKING,
  CLAUDE_4_6_OPUS_MAX,
  CLAUDE_4_5_HAIKU,
  GEMINI_2_5_PRO,
  GEMINI_3_PRO,
  GPT_5_LOW,
  GPT_5_MEDIUM,
  GPT_5_HIGH,
  GPT_5_1_LOW,
  GPT_5_1_MEDIUM,
  GPT_5_1_HIGH,
  GPT_5_1_CODEX_LOW,
  GPT_5_1_CODEX_MEDIUM,
  GPT_5_1_CODEX_HIGH,
  GPT_5_1_CODEX_MAX_LOW
]
