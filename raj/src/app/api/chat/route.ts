import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"

import { CHAT_SYSTEM_PROMPT } from "@/features/portfolio/data/chat-system-prompt"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: CHAT_SYSTEM_PROMPT,
    messages,
    maxTokens: 512,
  })

  return result.toDataStreamResponse()
}
