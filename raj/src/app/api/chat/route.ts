import { anthropic } from "@ai-sdk/anthropic"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

import { CHAT_SYSTEM_PROMPT } from "@/features/portfolio/data/chat-system-prompt"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: CHAT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 512,
  })

  return result.toUIMessageStreamResponse()
}
