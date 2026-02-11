import { LLM } from "@/types"

// OpenAI 官方模型列表已清空
// 所有模型现在使用自定义服务器: http://35.72.12.242:8000/warp/v1
// 自定义模型列表在 custom-llm-list.ts 中定义

export const OPENAI_LLM_LIST: LLM[] = []
