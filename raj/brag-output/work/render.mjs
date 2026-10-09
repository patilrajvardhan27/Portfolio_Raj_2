import { chromium } from "playwright-core"
import fs from "fs"
import path from "path"
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
const args = process.argv.slice(2)
const mode = args[0] // "stills" t1,t2,... | "all"
const browser = await chromium.launch({ executablePath: exe })
const ctx = await browser.newContext({ viewport: { width: 960, height: 540 }, deviceScaleFactor: mode === "all" ? 2 : Number(process.env.DSF || 1), colorScheme: "dark" })
const page = await ctx.newPage()
page.on("console", (m) => { if (m.type() === "error") console.log("ERR", m.text().slice(0, 300)) })
page.on("pageerror", (e) => console.log("PAGEERR", e.message.slice(0, 400)))
const types = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png" }
await page.route("**/__brag/**", (route) => {
  const f = path.join("comp", new URL(route.request().url()).pathname.replace("/__brag/", ""))
  route.fulfill({ body: fs.readFileSync(f), contentType: types[path.extname(f)] })
})
await page.goto("http://localhost:3457/__brag/index.html", { waitUntil: "networkidle" })
await page.evaluate(() => window.ready)
await page.waitForTimeout(500)
if (mode === "stills") {
  fs.mkdirSync("stills", { recursive: true })
  for (const t of args[1].split(",").map(Number)) {
    await page.evaluate((t) => window.renderAt(t), t)
    await page.screenshot({ path: `stills/${t.toFixed(2).padStart(5, "0")}.png` })
  }
} else {
  const fps = 30, n = 600
  fs.mkdirSync("frames", { recursive: true })
  for (let f = 0; f < n; f++) {
    await page.evaluate((t) => window.renderAt(t), f / fps)
    await page.screenshot({ path: `frames/${String(f).padStart(4, "0")}.jpg`, type: "jpeg", quality: 95 })
    if (f % 60 === 0) console.log("frame", f)
  }
}
await browser.close()
