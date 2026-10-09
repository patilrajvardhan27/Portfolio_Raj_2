import { chromium } from "playwright-core"
import fs from "fs"
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
const B = "http://localhost:3457"
const browser = await chromium.launch({ executablePath: exe })
const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, colorScheme: "dark" })
const page = await ctx.newPage()
const parts = {}
await page.goto(B + "/", { waitUntil: "networkidle" })
await page.waitForTimeout(1500)
parts.htmlClass = await page.evaluate(() => document.documentElement.className)
parts.bodyClass = await page.evaluate(() => document.body.className)
parts.css = await page.evaluate(() => [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.getAttribute("href")))
parts.styles = await page.evaluate(() => [...document.querySelectorAll('style')].map(s => s.textContent).filter(s => s.length < 20000))
console.log(await page.evaluate(() => [...document.body.children].map(e => e.tagName + "." + (e.className + "").slice(0, 60))))
parts.gate = await page.evaluate(() => document.querySelector('[role=dialog][aria-label="Enter the site"]').outerHTML)
await page.click('button[aria-label^="Drag the needle"]')
await page.waitForTimeout(600)
parts.gatePlaying = await page.evaluate(() => document.querySelector('[role=dialog][aria-label="Enter the site"]').outerHTML)
await page.waitForTimeout(8000) // let the name settle back on Devanagari or English; both live in the DOM anyway
const grab = () => page.evaluate(() => ({
  header: document.querySelector("body > header").outerHTML,
  main: document.querySelector("body > main").outerHTML,
  footer: document.querySelector("body > footer").outerHTML,
}))
parts.home = await grab()
await page.click('button[aria-label="Open chat"]')
await page.waitForTimeout(800)
parts.chat = await page.evaluate(() => document.querySelector('button[aria-label="Close chat"]').closest(".fixed").outerHTML)
await page.keyboard.type("What does Raj do?")
await page.waitForTimeout(200)
parts.chatTyped = await page.evaluate(() => document.querySelector('button[aria-label="Send message"]').outerHTML)
await ctx.close()
// Server-rendered projects page (no client JS), so every row is present.
const ctx2 = await browser.newContext({ viewport: { width: 960, height: 540 }, colorScheme: "dark", javaScriptEnabled: false })
const p2 = await ctx2.newPage()
await p2.goto(B + "/projects", { waitUntil: "load" })
const html = await p2.content()
fs.writeFileSync("dom/projects-ssr.html", html)
await browser.close()
fs.writeFileSync("parts.json", JSON.stringify(parts))
for (const [k, v] of Object.entries(parts)) console.log(k, typeof v === "string" ? v.length : JSON.stringify(v).length)
