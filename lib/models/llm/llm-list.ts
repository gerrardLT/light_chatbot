import { LLM } from "@/types"
import { ANTHROPIC_LLM_LIST } from "./anthropic-llm-list"
import { GOOGLE_LLM_LIST } from "./google-llm-list"
import { MISTRAL_LLM_LIST } from "./mistral-llm-list"
import { GROQ_LLM_LIST } from "./groq-llm-list"
import { OPENAI_LLM_LIST } from "./openai-llm-list"
import { PERPLEXITY_LLM_LIST } from "./perplexity-llm-list"
import { CUSTOM_LLM_LIST } from "./custom-llm-list"

// 注意：OPENAI_LLM_LIST 现在为空，所有模型来自 CUSTOM_LLM_LIST
// CUSTOM_LLM_LIST 中的模型 provider 设置为 "openai"，会调用 /api/chat/openai 路由
export const LLM_LIST: LLM[] = [
  ...CUSTOM_LLM_LIST,
  ...OPENAI_LLM_LIST,
  ...GOOGLE_LLM_LIST,
  ...MISTRAL_LLM_LIST,
  ...GROQ_LLM_LIST,
  ...PERPLEXITY_LLM_LIST,
  ...ANTHROPIC_LLM_LIST
]

export const LLM_LIST_MAP: Record<string, LLM[]> = {
  custom: CUSTOM_LLM_LIST,
  openai: [...CUSTOM_LLM_LIST, ...OPENAI_LLM_LIST], // 合并自定义模型和 OpenAI 官方模型（目前官方为空）
  azure: OPENAI_LLM_LIST,
  google: GOOGLE_LLM_LIST,
  mistral: MISTRAL_LLM_LIST,
  groq: GROQ_LLM_LIST,
  perplexity: PERPLEXITY_LLM_LIST,
  anthropic: ANTHROPIC_LLM_LIST
}
