import { chromium } from "playwright-core"
import fs from "fs"
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
const browser = await chromium.launch({ executablePath: exe })
const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, colorScheme: "dark" })
const page = await ctx.newPage()
page.on("console", m => { if (m.type() === "error") console.log("ERR", m.text().slice(0, 150)) })
for (const r of ["projects", "experience"]) {
  await page.goto("http://localhost:3457/" + r, { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  await page.click('button[aria-label^="Drag the needle"]')
  await page.waitForTimeout(5000)
  console.log(r, await page.evaluate(() => [document.querySelectorAll("h3").length, document.body.scrollHeight]))
  await page.screenshot({ path: `shots/${r}-full.png`, fullPage: true })
  fs.writeFileSync(`dom/${r}.html`, await page.evaluate(() => document.documentElement.outerHTML))
}
await browser.close()
