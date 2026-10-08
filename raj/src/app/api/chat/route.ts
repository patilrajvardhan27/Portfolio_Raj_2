import { anthropic } from "@ai-sdk/anthropic"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

import { CHAT_MAX_INPUT_CHARS } from "@/config/site"
import { CHAT_SYSTEM_PROMPT } from "@/features/portfolio/data/chat-system-prompt"

export const maxDuration = 30

/** Only the most recent turns are forwarded to the model. */
const MAX_MESSAGES = 20
/** Replies are capped at 512 output tokens, so this is generous. */
const MAX_ASSISTANT_CHARS = 4000
const MAX_BODY_BYTES = 64_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again."

const ALLOWED_ROLES = ["user", "assistant"] as const
type AllowedRole = (typeof ALLOWED_ROLES)[number]

/**
 * Best-effort, per-instance limiter. Serverless instances do not share
 * memory, so this slows abuse down rather than stopping it outright.
 */
const requestTimestampsByIp = new Map<string, number[]>()

const jsonError = (status: number, message: string): Response =>
  Response.json({ error: message }, { status })

const isSameOrigin = (req: Request): boolean => {
  const origin = req.headers.get("origin")
  const host = req.headers.get("host")
  if (!origin || !host) return false

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

const getClientIp = (req: Request): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const recentTimestamps = (requestTimestampsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )
  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestTimestampsByIp.set(ip, recentTimestamps)
    return true
  }

  recentTimestamps.push(now)
  requestTimestampsByIp.set(ip, recentTimestamps)
  return false
}

const isAllowedRole = (role: unknown): role is AllowedRole =>
  ALLOWED_ROLES.includes(role as AllowedRole)

/**
 * Rebuilds the client's messages from scratch, keeping only plain text from
 * user/assistant turns. Returns null when the payload is not a valid chat.
 */
const sanitizeMessages = (payload: unknown): UIMessage[] | null => {
  const rawMessages = (payload as { messages?: unknown } | null)?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) return null

  const messages: UIMessage[] = []
  for (const [index, rawMessage] of rawMessages.slice(-MAX_MESSAGES).entries()) {
    const { role, parts } = (rawMessage ?? {}) as {
      role?: unknown
      parts?: unknown
    }
    if (!isAllowedRole(role) || !Array.isArray(parts)) return null

    const text = parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          part?.type === "text" && typeof part.text === "string"
      )
      .map((part) => part.text)
      .join("")
      .trim()
    if (!text) return null

    const maxChars = role === "user" ? CHAT_MAX_INPUT_CHARS : MAX_ASSISTANT_CHARS
    if (text.length > maxChars) return null

    messages.push({ id: String(index), role, parts: [{ type: "text", text }] })
  }

  if (messages.at(-1)?.role !== "user") return null
  return messages
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return jsonError(403, "Forbidden.")

  if (isRateLimited(getClientIp(req))) {
    console.warn("[chat] rate limit hit")
    return jsonError(429, "Too many messages. Please wait a minute.")
  }

  const body = await req.text()
  if (body.length > MAX_BODY_BYTES) return jsonError(413, "Message too long.")

  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return jsonError(400, "Invalid request.")
  }

  const messages = sanitizeMessages(payload)
  if (!messages) return jsonError(400, "Invalid request.")

  try {
    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: CHAT_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 512,
    })

    return result.toUIMessageStreamResponse({
      // Keep provider errors and stack traces on the server.
      onError: (error) => {
        console.error("[chat] stream error", error)
        return GENERIC_ERROR_MESSAGE
      },
    })
  } catch (error) {
    console.error("[chat] request failed", error)
    return jsonError(500, GENERIC_ERROR_MESSAGE)
  }
}
