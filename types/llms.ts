import { ModelProvider } from "."

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | CustomLLMID

// OpenAI Models (官方模型已清空，现在只有自定义模型)
// 自定义模型的 ID 在 CustomLLMID 中定义，但 provider 设置为 "openai"
export type OpenAILLMID = CustomLLMID // 现在 OpenAI 类型指向自定义模型

// Google Models
export type GoogleLLMID =
  | "gemini-pro" // Gemini Pro
  | "gemini-pro-vision" // Gemini Pro Vision
  | "gemini-1.5-pro-latest" // Gemini 1.5 Pro
  | "gemini-1.5-flash" // Gemini 1.5 Flash

// Anthropic Models
export type AnthropicLLMID =
  | "claude-2.1" // Claude 2
  | "claude-instant-1.2" // Claude Instant
  | "claude-3-haiku-20240307" // Claude 3 Haiku
  | "claude-3-sonnet-20240229" // Claude 3 Sonnet
  | "claude-3-opus-20240229" // Claude 3 Opus
  | "claude-3-5-sonnet-20240620" // Claude 3.5 Sonnet

// Mistral Models
export type MistralLLMID =
  | "mistral-tiny" // Mistral Tiny
  | "mistral-small-latest" // Mistral Small
  | "mistral-medium-latest" // Mistral Medium
  | "mistral-large-latest" // Mistral Large

export type GroqLLMID =
  | "llama3-8b-8192" // LLaMA3-8b
  | "llama3-70b-8192" // LLaMA3-70b
  | "mixtral-8x7b-32768" // Mixtral-8x7b
  | "gemma-7b-it" // Gemma-7b IT

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | "pplx-7b-online" // Perplexity Online 7B
  | "pplx-70b-online" // Perplexity Online 70B
  | "pplx-7b-chat" // Perplexity Chat 7B
  | "pplx-70b-chat" // Perplexity Chat 70B
  | "mixtral-8x7b-instruct" // Mixtral 8x7B Instruct
  | "mistral-7b-instruct" // Mistral 7B Instruct
  | "llama-2-70b-chat" // Llama2 70B Chat
  | "codellama-34b-instruct" // CodeLlama 34B Instruct
  | "codellama-70b-instruct" // CodeLlama 70B Instruct
  | "sonar-small-chat" // Sonar Small Chat
  | "sonar-small-online" // Sonar Small Online
  | "sonar-medium-chat" // Sonar Medium Chat
  | "sonar-medium-online" // Sonar Medium Online

// Custom Models (自定义服务器模型)
// 这些模型的 provider 设置为 "openai"，会调用 /api/chat/openai 路由
export type CustomLLMID =
  | "claude-4-sonnet"
  | "claude-4-5-sonnet"
  | "claude-4-5-sonnet-thinking"
  | "claude-4-5-opus"
  | "claude-4-6-opus-high"
  | "claude-4-5-opus-thinking"
  | "claude-4-6-opus-max"
  | "claude-4-5-haiku"
  | "gemini-2-5-pro"
  | "gemini-3-pro"
  | "gpt-5-low"
  | "gpt-5-medium"
  | "gpt-5-high"
  | "gpt-5-1-low"
  | "gpt-5-1-medium"
  | "gpt-5-1-high"
  | "gpt-5-1-codex-low"
  | "gpt-5-1-codex-medium"
  | "gpt-5-1-codex-high"
  | "gpt-5-1-codex-max-low"

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  hostedId: string
  platformLink: string
  imageInput: boolean
  pricing?: {
    currency: string
    unit: string
    inputCost: number
    outputCost?: number
  }
}

export interface OpenRouterLLM extends LLM {
  maxContext: number
}
