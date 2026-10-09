import dynamic from "next/dynamic"

import { EntryGate } from "@/components/entry-gate"
import { SiteCounters } from "@/components/site-counters"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
)

const ChatWidget = dynamic(() =>
  import("@/components/chat-widget").then((mod) => mod.ChatWidget)
)

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EntryGate />
      <SiteCounters />
      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <SiteFooter />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}
