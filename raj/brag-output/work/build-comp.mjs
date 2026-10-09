import fs from "fs"
const parts = JSON.parse(fs.readFileSync("parts.json", "utf8"))
const ssr = fs.readFileSync("dom/projects-ssr.html", "utf8")
const src = fs.readFileSync("../../src/features/portfolio/data/projects.ts", "utf8")
const PROJECTS = new Function(src.replace(/^import.*$/m, "").replace("export const PROJECTS: Project[] =", "return"))()
const data = Object.fromEntries(PROJECTS.map((p) => [p.title, { description: p.description, skills: p.skills }]))
const j = (o) => JSON.stringify(o).replace(/</g, "\\u003c")
const html = `<!doctype html>
<html lang="en" class="${parts.htmlClass}" style="color-scheme: dark">
<head>
<meta charset="utf-8">
${parts.css.map((h) => `<link rel="stylesheet" href="${h}">`).join("\n")}
<style>
html,body{margin:0;width:960px;height:540px;overflow:hidden;background:#09090b}
*,*::before,*::after{transition:none!important;scroll-behavior:auto!important}
#frame{position:relative;width:960px;height:540px;overflow:hidden;background:var(--background)}
#cam{position:absolute;inset:0;transform-origin:0 0}
.page{position:absolute;inset:0;overflow:hidden;transform:translateZ(0);background:var(--background)}
#gate,#outro{background:transparent}
.scroller{position:absolute;inset:0;overflow:hidden}
.hl{background:linear-gradient(#ac0b10,#ac0b10) no-repeat 0 100%/calc(var(--p,0)*100%) 100%;color:color-mix(in oklab,#fafafa calc(var(--p,0)*100%),var(--brand-red));padding:1px 3px;margin:0 -3px;border-radius:3px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
#ui{position:absolute;inset:0;pointer-events:none;font-family:var(--font-montserrat);color:#fafafa}
.cap{position:absolute;font-weight:900;text-transform:uppercase;letter-spacing:-0.04em;line-height:1}
#cap1{left:40px;top:36px;font-size:27px;padding:12px 18px 11px;border-radius:12px;background:linear-gradient(#c40f15,#7a0306);box-shadow:0 14px 34px rgba(0,0,0,.55);white-space:nowrap}
#cap1 i{font-style:normal;opacity:.55;margin:0 .35em}
#shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,9,11,.96) 0%,rgba(9,9,11,.92) 40%,rgba(9,9,11,0) 54%)}
#cap2{left:40px;top:180px;font-size:50px;line-height:.98}
#cap2 .ln{display:block;overflow:hidden;padding:2px 6px 6px 0}
#cap2 .ln>span{display:block}
#cap2b{background:linear-gradient(#e3262d,#ac0b10);-webkit-background-clip:text;background-clip:text;color:transparent}
#cap2c{display:block;margin-top:14px;font-family:var(--font-geist-mono);font-weight:500;font-size:14px;max-width:400px;line-height:1.45;letter-spacing:.02em;text-transform:none;color:#a1a1aa}
#cardWrap{position:absolute;right:34px;bottom:34px;width:440px;transform-origin:100% 100%}
#discHold{position:absolute;left:0;top:50%;width:196px;height:196px;margin-top:-98px;border-radius:999px;box-shadow:0 20px 40px rgba(0,0,0,.6)}
#cardDisc{position:absolute;inset:0;border-radius:999px;display:flex;align-items:center;justify-content:center;background:repeating-radial-gradient(circle,#09090b 0,#09090b 2px,#1f1f23 3px,#09090b 4px)}
#cardDisc b{display:block;width:38%;aspect-ratio:1;border-radius:999px;background:linear-gradient(#e3262d,#ac0b10);box-shadow:0 0 0 2px rgba(0,0,0,.5)}
#cardDisc u{position:absolute;width:3.5%;aspect-ratio:1;border-radius:999px;background:#09090b}
#discHold::after{content:"";position:absolute;inset:0;border-radius:999px;background:conic-gradient(from 25deg,transparent 0deg,rgba(255,255,255,.16) 30deg,transparent 60deg,transparent 180deg,rgba(255,255,255,.16) 210deg,transparent 240deg)}
#card{position:relative;border-radius:24px;padding:24px 30px 26px;background:linear-gradient(#b80d13,#620203);box-shadow:0 30px 70px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.18)}
#cardTag{font-size:15px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.78}
#cardNum{font-size:86px;font-weight:900;letter-spacing:-0.055em;line-height:1;margin:6px 0 4px -3px;font-variant-numeric:tabular-nums}
#cardLabel{font-size:21px;font-weight:800;letter-spacing:-0.01em;text-transform:uppercase}
#cursor{position:absolute;left:0;top:0;width:26px;height:26px;transform-origin:4px 3px;filter:drop-shadow(0 3px 5px rgba(0,0,0,.5))}
#ring{position:absolute;left:-20px;top:-20px;width:40px;height:40px;border-radius:999px;border:2.5px solid #fafafa}
.outro-url{margin-top:14px;font-family:var(--font-geist-mono);font-size:22px;font-weight:600;letter-spacing:-0.01em;color:#fafafa}
</style>
</head>
<body>
<div id="frame">
  <div id="cam">
    <div id="home" class="page"><div id="homeScroll" class="scroller"></div></div>
    <div id="proj" class="page"><div id="projScroll" class="scroller"></div></div>
    <div id="gate" class="page"></div>
  </div>
  <div id="ui">
    <div id="cap1" class="cap">Full-stack developer<i>/</i>CU Boulder</div>
    <div id="cardWrap"><div id="discHold"><div id="cardDisc"><b></b><u></u></div></div>
      <div id="card"><div id="cardTag"></div><div id="cardNum"></div><div id="cardLabel"></div></div></div>
    <div id="shade"></div>
    <div id="cap2" class="cap"><span class="ln"><span id="cap2a">Don’t read it.</span></span><span class="ln"><span id="cap2b">Ask it.</span></span><span id="cap2c">A Claude-powered chat, built into the site.</span></div>
  </div>
  <div id="outro" class="page"></div>
  <div id="ui2" style="position:absolute;inset:0;pointer-events:none">
    <div id="ring"></div>
    <svg id="cursor" viewBox="0 0 26 26"><path d="M4 3 L4 21 L9 16.6 L12.2 23.6 L15.4 22.2 L12.3 15.4 L18.8 15.4 Z" fill="#09090b" stroke="#fafafa" stroke-width="1.6" stroke-linejoin="round"/></svg>
  </div>
</div>
<script>window.PARTS=${j(parts)};window.SSR=${j(ssr)};window.PROJECT_DATA=${j(data)}</script>
<script src="/__brag/timeline.js"></script>
<script>
  setup(window.PARTS, window.SSR)
  window.ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]).then(() => document.fonts.ready)
</script>
</body></html>`
fs.writeFileSync("comp/index.html", html)
console.log("comp/index.html", html.length)
