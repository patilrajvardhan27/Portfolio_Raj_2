"use client"

import type { Message } from "ai"
import { useChat } from "ai/react"
import { MessageCircleIcon, SendIcon, XIcon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ api: "/api/chat" })

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [open, messages])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleFormSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          className={cn(
            "flex h-[480px] w-[min(calc(100vw-2rem),380px)] flex-col",
            "rounded-2xl border border-edge bg-background shadow-2xl",
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-edge px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-foreground">
                <MessageCircleIcon className="size-3.5 text-background" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Ask about Raj</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <XIcon className="size-3.5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-edge bg-accent">
                  <MessageCircleIcon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Ask me anything about Raj</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    His experience, projects, skills, or background
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="rounded-full border border-edge bg-accent px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/80 hover:text-foreground"
                      onClick={() => {
                        handleInputChange({
                          target: { value: s },
                        } as React.ChangeEvent<HTMLInputElement>)
                        inputRef.current?.focus()
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m: Message) => (
              <div
                key={m.id}
                className={cn(
                  "flex max-w-[85%] flex-col gap-1",
                  m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-foreground text-background"
                      : "rounded-bl-sm border border-edge bg-accent text-foreground"
                  )}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="mb-1 list-disc pl-4">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-1 list-decimal pl-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-0.5">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="mr-auto flex max-w-[85%] items-start">
                <div className="rounded-2xl rounded-bl-sm border border-edge bg-accent px-3.5 py-2.5">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {error && (
              <p className="text-center text-xs text-destructive">
                Something went wrong. Try again.
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-2 border-t border-edge p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              className={cn(
                "h-9 flex-1 rounded-xl border border-input bg-accent px-3 text-sm outline-none",
                "placeholder:text-muted-foreground",
                "focus:border-ring focus:ring-2 focus:ring-ring/30",
                "dark:bg-input/30"
              )}
              disabled={isLoading}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 shrink-0 rounded-xl"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <SendIcon className="size-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-200",
          "bg-foreground text-background hover:scale-105 active:scale-95",
          open && "rotate-90"
        )}
      >
        {open ? (
          <XIcon className="size-5" />
        ) : (
          <MessageCircleIcon className="size-5" />
        )}
      </button>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

const SUGGESTIONS = [
  "What does Raj do?",
  "Where has he worked?",
  "What are his projects?",
  "What's his tech stack?",
]
