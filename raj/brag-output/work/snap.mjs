import { chromium } from "playwright-core"
import fs from "fs"
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
const B = "http://localhost:3457"
const browser = await chromium.launch({ executablePath: exe })
const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 1, colorScheme: "dark" })
const page = await ctx.newPage()
page.on("console", m => { if (m.type() === "error") console.log("ERR", m.text().slice(0, 200)) })
fs.mkdirSync("shots", { recursive: true }); fs.mkdirSync("dom", { recursive: true })
const dump = async (name) => {
  const html = await page.evaluate(() => document.documentElement.outerHTML)
  fs.writeFileSync(`dom/${name}.html`, html)
}
await page.goto(B + "/", { waitUntil: "networkidle" })
await page.waitForTimeout(1500)
await page.screenshot({ path: "shots/gate.png" })
await dump("gate")
await page.click('button[aria-label^="Drag the needle"]')
await page.waitForTimeout(600)
await page.screenshot({ path: "shots/gate-playing.png" })
await page.waitForTimeout(4500)
await page.screenshot({ path: "shots/home.png" })
await page.screenshot({ path: "shots/home-full.png", fullPage: true })
await dump("home")
await page.click('button[aria-label="Open chat"]')
await page.waitForTimeout(600)
await page.screenshot({ path: "shots/chat.png" })
await dump("chat")
for (const r of ["projects", "experience"]) {
  await page.goto(B + "/" + r, { waitUntil: "networkidle" })
  await page.waitForTimeout(800)
  const gate = await page.$('button[aria-label^="Drag the needle"]')
  if (gate) { await gate.click(); await page.waitForTimeout(5000) }
  await page.screenshot({ path: `shots/${r}-full.png`, fullPage: true })
  await dump(r)
}
const css = await page.evaluate(() => [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href))
console.log(css)
await browser.close()
