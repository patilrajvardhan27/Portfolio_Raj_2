// Every frame is a pure function of t (seconds). window.renderAt(t) lays the whole frame out.
const DUR = 20
const BEAT = 0.625
const T_GRAB = 0.55, T_DROP = 1.6, T_REVEAL = 2.5, REVEAL_S = 1.2
const T_PROJ = 7.5, T_STATS = [7.5, 9.375, 11.25], T_CHAT = 12.5, T_OUT = 17.5

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, p) => a + (b - a) * p
const prog = (t, a, b) => clamp((t - a) / (b - a))
const eio = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const eo = (p) => 1 - Math.pow(1 - p, 3)
const eo5 = (p) => 1 - Math.pow(1 - p, 5)
const ei = (p) => p * p * p
const back = (p) => { const c = 1.4; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2) }
const lin = (p) => p
// keyframes: [[t, value, easeIntoThisKey]], value is a number or array
const kf = (t, keys) => {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, ease = eio] = keys[i]
    if (t <= t1) {
      const [t0, v0] = keys[i - 1]
      const p = ease(prog(t, t0, t1))
      return Array.isArray(v1) ? v1.map((v, j) => lerp(v0[j], v, p)) : lerp(v0, v1, p)
    }
  }
  return keys[keys.length - 1][1]
}
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const center = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2] }

const E = {}

const GLITCH = [
  [0, 0, "translate(0)", "none", "inset(0 0 0 0)"],
  [6, 1, "translate(3px,-2px)", "hue-rotate(20deg) saturate(1.4) contrast(1.2)", "inset(20% 0 40% 0)"],
  [12, 1, "translate(-4px,1px)", "hue-rotate(-25deg) contrast(1.3)", "inset(60% 0 10% 0)"],
  [18, 0.5, "translate(2px,0)", "invert(0.15)", "inset(0 0 0 0)"],
  [26, 1, "translate(-2px,2px)", "hue-rotate(15deg)", "inset(35% 0 25% 0)"],
  [34, 1, "translate(0)", "none", "inset(0 0 0 0)"],
  [72, 1, "translate(0)", "none", "inset(0 0 0 0)"],
  [80, 0.6, "translate(-2px,0)", "hue-rotate(-10deg) contrast(1.2)", "inset(45% 0 30% 0)"],
  [88, 1, "translate(2px,1px)", "none", "inset(0 0 0 0)"],
  [100, 0, "translate(0)", "none", "inset(0 0 0 0)"],
]

const STATS = [
  { title: "Gradmits", num: 250, fmt: (n) => `${Math.round(n)}K+`, label: "real admission decisions", phrase: "250K+ real admission decisions" },
  { title: "GradBro", num: 1500, fmt: (n) => `${Math.round(n).toLocaleString("en-US")}+`, label: "applicants use it", phrase: "1,500+ applicants" },
  { title: "MessIt", num: 20000, fmt: (n) => `${Math.round(n).toLocaleString("en-US")}+`, label: "users", phrase: "20,000+ users" },
]

const QUESTION = "What does Raj do?"
const ANSWER = "Full-stack developer at **CU Boulder**. He ships AI-backed web apps like **Gradmits** and **GradBro**."
const T_TYPE = 13.55, TYPE_STEP = 0.052, T_SEND = 14.7, T_DOTS = 14.78, T_STREAM = 15.25, STREAM_END = 16.15

const answerHTML = (count) => {
  // word-level stream that keeps markdown bold intact
  const words = []
  ANSWER.split(/(\*\*[^*]+\*\*)/).forEach((seg) => {
    const bold = seg.startsWith("**")
    const text = bold ? seg.slice(2, -2) : seg
    text.split(/(\s+)/).forEach((w) => { if (w) words.push({ w, bold }) })
  })
  let n = 0, html = ""
  const total = words.filter((x) => x.w.trim()).length
  for (const { w, bold } of words) {
    if (w.trim()) { if (n >= count) break; n++ }
    html += bold ? `<strong class="font-semibold">${w}</strong>` : w
  }
  return { html, total }
}
const ANSWER_WORDS = answerHTML(0).total

function setup(parts, projSSR) {
  const P = (id) => document.getElementById(id)
  // ---- home page
  P("homeScroll").innerHTML = parts.home.header + parts.home.main + parts.home.footer
  // ---- projects page (server-rendered markup)
  const doc = new DOMParser().parseFromString(projSSR, "text/html")
  P("projScroll").innerHTML = parts.home.header + doc.querySelector("body > main").outerHTML + parts.home.footer
  // nav active state: swap the classes of the Portfolio and Projects links
  const navLinks = (root) => $$("header nav a", root)
  const pl = navLinks(P("projScroll"))
  const a = pl.find((x) => x.textContent.trim() === "Portfolio"), b = pl.find((x) => x.textContent.trim() === "Projects")
  if (a && b) { const c = a.className; a.className = b.className; b.className = c }
  P("proj").insertAdjacentHTML("beforeend", parts.chat)
  // ---- gate + outro
  P("gate").innerHTML = parts.gate
  P("outro").innerHTML = parts.gatePlaying

  document.querySelectorAll("script, audio, [data-nextjs-toast]").forEach((n) => n.remove())

  // ---- handles
  const home = P("home")
  E.homeScroll = P("homeScroll"); E.projScroll = P("projScroll")
  E.banner = $('img[alt="Banner"]', home)
  E.avatar = $('[role="img"][aria-label$="avatar"]', home)
  E.star = $(".animate-starfield-pan", E.avatar)
  const imgs = $$(":scope > img", E.avatar)
  E.selfie = imgs[0]; E.surfer = imgs[1]
  const name = $("h1 > span", home)
  E.nameDev = name.children[0]; E.nameEn = name.children[1]; E.badge = name.children[2]
  E.nameDevW = E.nameDev.firstElementChild; E.nameEnW = E.nameEn.firstElementChild
  E.flip = $(".font-pixel-square", home)
  E.aboutLi = $$("li", home).find((li) => li.textContent.trim().startsWith("Started coding"))
  const liNode = [...E.aboutLi.childNodes].find((n) => n.nodeType === 3 && n.textContent.includes("Started")) || E.aboutLi.firstChild
  const target = liNode.nodeType === 3 ? liNode : [...liNode.childNodes].find((n) => n.nodeType === 3)
  const span = document.createElement("span"); span.className = "hl"; span.textContent = target.textContent
  target.replaceWith(span); E.aboutHl = span
  E.navProjects = navLinks(home).find((x) => x.textContent.trim() === "Projects")
  E.about = $$("h2", home).find((h) => h.textContent.trim() === "About")

  // ---- project rows: open the three we feature, using the first (already open) row as the template
  const rows = $$("#projects [data-slot=collapsible]", P("proj")).filter((r) => r.querySelector("h3"))
  const byTitle = (t) => rows.find((r) => r.querySelector("h3").textContent.trim() === t)
  const tpl = byTitle("Gradmits").querySelector("[data-slot=collapsible-content]")
  const tagTpl = tpl.querySelector("ul li")
  STATS.forEach((s) => {
    const row = byTitle(s.title)
    const data = window.PROJECT_DATA[s.title]
    let content = row.querySelector("[data-slot=collapsible-content]")
    if (!content || !content.querySelector("p")) {
      if (content) content.remove()
      content = tpl.cloneNode(true)
      content.removeAttribute("id"); content.hidden = false
      content.querySelector("p").textContent = data.description
      const ul = content.querySelector("ul"); ul.innerHTML = ""
      data.skills.forEach((k) => { const li = tagTpl.cloneNode(true); li.firstElementChild.textContent = k; ul.appendChild(li) })
      row.appendChild(content)
      row.dataset.state = "open"
      row.querySelectorAll("[data-state]").forEach((n) => (n.dataset.state = "open"))
    }
    content.style.animation = "none"
    const p = content.querySelector("p")
    p.innerHTML = p.textContent.replace(s.phrase, `<span class="hl">${s.phrase}</span>`)
    s.row = row; s.hl = p.querySelector(".hl")
  })

  // ---- chat
  const chat = P("proj").lastElementChild
  E.chat = chat
  E.panel = chat.children[0]; E.fab = chat.children[1]
  E.panel.classList.remove("animate-in", "slide-in-from-bottom-4", "fade-in-0", "duration-200")
  E.fab.classList.remove("rotate-90", "transition-all")
  E.fabX = E.fab.querySelector("svg")
  const bubbleIcon = E.panel.querySelector("svg.lucide-message-circle").cloneNode(true)
  bubbleIcon.setAttribute("class", "lucide lucide-message-circle size-5")
  E.fab.appendChild(bubbleIcon); E.fabBubble = bubbleIcon
  E.msgs = E.panel.children[1]
  E.empty = E.msgs.firstElementChild
  E.input = E.panel.querySelector("input")
  E.send = E.panel.querySelector('button[aria-label="Send message"]')
  E.msgs.insertAdjacentHTML("beforeend",
    `<div id="mUser" class="flex max-w-[85%] flex-col gap-1 ml-auto items-end"><div class="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed rounded-br-sm bg-foreground text-background">${QUESTION}</div></div>
     <div id="mDots" class="mr-auto flex max-w-[85%] items-start"><div class="rounded-2xl rounded-bl-sm border border-edge bg-accent px-3.5 py-2.5"><div class="flex items-center gap-1" style="height:1.4em">${[0, 1, 2].map(() => `<span class="size-1.5 rounded-full bg-muted-foreground"></span>`).join("")}</div></div></div>
     <div id="mBot" class="flex max-w-[85%] flex-col gap-1 mr-auto items-start"><div class="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed rounded-bl-sm border border-edge bg-accent text-foreground"><p class="mb-1 last:mb-0"></p></div></div>`)
  E.mUser = P("mUser"); E.mDots = P("mDots"); E.mBot = P("mBot"); E.mBotP = E.mBot.querySelector("p")
  E.dots = $$("span", E.mDots)

  // ---- gate / outro handles
  const gateParts = (root) => {
    const overlay = root.firstElementChild
    overlay.classList.remove("entry-reveal-mask")
    const btn = overlay.querySelector("button")
    const spans = [...btn.children]
    const texts = overlay.lastElementChild.querySelectorAll("p")
    return { overlay, btn, record: spans[0], disc: spans[0].children[0], arm: spans[2], h: texts[0], sub: texts[1], top: overlay.firstElementChild, textWrap: overlay.lastElementChild }
  }
  E.g = gateParts(P("gate")); E.o = gateParts(P("outro"))
  ;[E.g, E.o].forEach((g) => { g.disc.style.animation = "none"; g.arm.style.transition = "none" })
  E.star.style.animation = "none"
  E.o.h.textContent = "Drop the needle"
  E.o.sub.textContent = "portfolio-raj-2.vercel.app"
  E.o.sub.className = "outro-url"
  E.o.btn.style.width = "330px"; E.o.overlay.style.gap = "26px"

  E.cam = P("cam"); E.gate = P("gate"); E.homeEl = home; E.proj = P("proj"); E.outro = P("outro")
  E.cursor = P("cursor"); E.ring = P("ring")
  E.cap1 = P("cap1"); E.cap2 = P("cap2"); E.cap2a = P("cap2a"); E.cap2b = P("cap2b"); E.cap2c = P("cap2c"); E.shade = P("shade")
  E.card = P("card"); E.cardNum = P("cardNum"); E.cardLabel = P("cardLabel"); E.cardTag = P("cardTag"); E.cardDisc = P("cardDisc"); E.cardWrap = P("cardWrap")

  // banner frames stacked over the real <img>
  const wrap = E.banner.parentElement; wrap.style.position = "relative"
  E.frames = []
  for (let i = 1; i <= 25; i++) {
    const im = new Image(); im.src = `/__brag/banner/${String(i).padStart(2, "0")}.png`
    im.className = E.banner.className; im.style.cssText = "position:absolute;inset:0;visibility:hidden"
    wrap.appendChild(im); E.frames.push(im)
  }
  E.banner.style.visibility = "hidden"
}

const camCss = ([cx, cy, s]) => `translate(${480 - cx * s}px, ${270 - cy * s}px) scale(${s})`

function renderAt(t) {
  // ================= visibility of pages
  const onGate = t < T_REVEAL + REVEAL_S
  const onHome = t >= T_DROP && t < T_PROJ
  const onProj = t >= T_PROJ
  const onOutro = t >= T_OUT
  E.gate.style.display = onGate ? "" : "none"
  E.homeEl.style.display = onHome ? "" : "none"
  E.proj.style.display = onProj ? "" : "none"
  E.outro.style.display = onOutro ? "" : "none"

  // ================= camera
  let cam
  if (t < T_PROJ) {
    cam = kf(t, [
      [0, [472, 300, 1.15]], [1.5, [480, 270, 1.0], eo], [T_DROP, [480, 270, 1.0]],
      [T_DROP + 0.09, [480, 270, 1.035], eo], [T_DROP + 0.5, [480, 270, 1.0], eo],
      [3.35, [480, 270, 1.0]], [4.9, [436, 250, 1.42], eio], [5.35, [436, 250, 1.44], lin],
      [6.1, [424, 300, 1.3], eio], [6.85, [426, 300, 1.34], lin], [7.28, [480, 270, 1.0], eio], [T_PROJ, [480, 270, 1.0]],
    ])
  } else if (t < T_CHAT) {
    const i = t < T_STATS[1] ? 0 : t < T_STATS[2] ? 1 : 2
    const p = prog(t, T_STATS[i], (T_STATS[i + 1] || T_CHAT))
    const punch = 1 + 0.05 * (1 - eo5(prog(t, T_STATS[i], T_STATS[i] + 0.45)))
    cam = [480, 225, (1.2 + 0.03 * p) * punch]
  } else {
    cam = kf(t, [[T_CHAT, [480, 225, 1.23]], [12.95, [480, 270, 1.0], eio], [13.05, [480, 270, 1.0]], [13.75, [566, 242, 1.22], eio], [T_OUT, [566, 244, 1.25], lin], [DUR, [566, 244, 1.25]]])
  }
  E.cam.style.transform = camCss(cam)

  // ================= gate
  const armAngle = kf(t, [[0, -6], [T_GRAB, -6], [1.5, 28, eio], [DUR, 28]])
  const spin = (tt) => (tt < T_DROP ? 60 * tt : 60 * T_DROP + 198 * (tt - T_DROP))
  if (onGate) {
    const g = E.g
    g.disc.style.rotate = `${spin(t)}deg`
    g.arm.style.rotate = `${armAngle}deg`
    const placed = t >= T_DROP
    g.h.textContent = placed ? "Now playing" : "Drop the needle"
    g.sub.textContent = placed ? "Opening the site" : "Drag the tonearm onto the record to start the music and enter"
    // headline swap pops in
    const pop = placed ? 1 + 0.06 * (1 - eo5(prog(t, T_DROP, T_DROP + 0.35))) : 1
    g.textWrap.style.transform = `scale(${pop})`
    if (t >= T_REVEAL) {
      E.cam.style.transform = camCss([480, 270, 1])
      const r = E.g.disc.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const max = Math.hypot(Math.max(cx, 960 - cx), Math.max(cy, 540 - cy))
      const rad = max * eio(prog(t, T_REVEAL, T_REVEAL + REVEAL_S))
      const m = `radial-gradient(circle at ${cx}px ${cy}px, transparent ${rad}px, black ${rad + 2}px)`
      g.overlay.style.maskImage = m; g.overlay.style.webkitMaskImage = m
      E.cam.style.transform = camCss(cam)
    } else { g.overlay.style.maskImage = "none"; g.overlay.style.webkitMaskImage = "none" }
  }

  // ================= home
  if (onHome) {
    E.homeScroll.scrollTop = kf(t, [[0, 0], [3.35, 0], [4.9, 120, eio], [5.35, 120], [6.1, 742, eio]])
    const f = Math.floor(t * 10) % 25
    E.frames.forEach((im, i) => (im.style.visibility = i === f ? "visible" : "hidden"))
    E.star.style.transform = `translateX(${-((t / 8) % 1) * 50}%)`
    // avatar glitch (same keyframes as the site's glitch-flash, stepped)
    const TG = 3.55, gp = ((t - TG) / 0.9) * 100
    let k = GLITCH[0]
    if (gp >= 0 && gp < 100) for (const row of GLITCH) if (row[0] <= gp) k = row
    Object.assign(E.selfie.style, { animation: "none", opacity: gp >= 0 && gp < 100 ? k[1] : 0, transform: k[2], filter: k[3], clipPath: k[4] })
    E.surfer.style.opacity = 1 - prog(t, TG, TG + 0.2) + prog(t, TG + 0.9, TG + 1.1)
    // name: Devanagari -> English, 700ms blur crossfade
    const np = eio(prog(t, 4.25, 4.95))
    E.nameDev.className = E.nameDev.className.replace(/\bopacity-\d+\b|\bblur-\w+\b/g, "")
    E.nameEn.className = E.nameEn.className.replace(/\bopacity-\d+\b|\bblur-\w+\b/g, "")
    E.nameDev.style.cssText = `opacity:${1 - np};filter:blur(${8 * np}px);transition:none`
    E.nameEn.style.cssText = `opacity:${np};filter:blur(${8 * (1 - np)}px);transition:none`
    const wd = E.nameDevW.offsetWidth, we = E.nameEnW.offsetWidth
    E.badge.style.transition = "none"; E.badge.style.opacity = 1
    E.badge.style.translate = `${lerp(wd, we, np) + 8}px -50%`
    E.flip.textContent = "Your PATH is uniquely yours"
    E.flip.style.cssText = "opacity:1;transform:none"
    // marker sweep over the About line
    const hp = eo(prog(t, 6.2, 6.75))
    E.aboutHl.style.setProperty("--p", hp)
  }

  if (!onProj) E.cardWrap.style.display = "none"
  // ================= projects + stat cards
  if (onProj) {
    const ps = E.projScroll
    const tops = STATS.map((s) => { let y = 0, el = s.row; while (el && el !== ps) { y += el.offsetTop; el = el.offsetParent } return y - 62 })
    ps.scrollTop = kf(t, [[T_STATS[0], tops[0]], [T_STATS[1] - 0.16, tops[0]], [T_STATS[1] + 0.2, tops[1], eio], [T_STATS[2] - 0.2, tops[1]], [T_STATS[2] + 0.22, tops[2], eio]])
    STATS.forEach((s, i) => s.hl.style.setProperty("--p", eo(prog(t, T_STATS[i] + 0.3, T_STATS[i] + 0.75))))
    const inStats = t < T_CHAT + 0.3
    E.cardWrap.style.display = inStats ? "" : "none"
    if (inStats) {
      const i = t < T_STATS[1] - 0.14 ? 0 : t < T_STATS[2] - 0.14 ? 1 : 2
      const s = STATS[i], t0 = T_STATS[i], t1 = (T_STATS[i + 1] || T_CHAT + 0.14) - 0.14
      const pin = back(prog(t, t0, t0 + 0.38)), pout = ei(prog(t, t1, t1 + 0.14))
      const x = lerp(520, 0, pin) + 560 * pout
      E.cardWrap.style.transform = `translateX(${x}px) rotate(${lerp(6, -2.5, clamp(pin))}deg)`
      E.cardNum.textContent = s.fmt(s.num)
      E.cardLabel.textContent = s.label
      E.cardTag.textContent = s.title
      E.cardDisc.style.rotate = `${t * 198}deg`
      E.cardDisc.parentElement.style.translate = `${lerp(40, -96, eo(prog(t, t0 + 0.2, t0 + 0.6)))}px 0`
    }

    // chat
    const open = prog(t, 13.0, 13.2)
    E.panel.style.display = t >= 13.0 ? "" : "none"
    E.panel.style.opacity = eo(open)
    E.panel.style.transform = `translateY(${16 * (1 - eo(open))}px)`
    const press = 1 - 0.1 * (prog(t, 12.9, 12.97) - prog(t, 12.97, 13.1))
    E.fab.style.transform = `scale(${press}) rotate(${90 * eo(open)}deg)`
    E.fabX.style.display = open > 0.4 ? "" : "none"
    E.fabBubble.style.display = open > 0.4 ? "none" : ""
    const typed = clamp(Math.floor((t - T_TYPE) / TYPE_STEP) + 1, 0, QUESTION.length)
    const sent = t >= T_SEND
    E.input.value = sent ? "" : QUESTION.slice(0, typed)
    E.input.disabled = false
    E.send.disabled = sent || typed === 0
    E.send.style.transform = `scale(${1 - 0.12 * (prog(t, T_SEND - 0.07, T_SEND) - prog(t, T_SEND, T_SEND + 0.12))})`
    E.empty.style.display = sent ? "none" : ""
    E.mUser.style.display = sent ? "" : "none"
    const up = eo(prog(t, T_SEND, T_SEND + 0.22))
    E.mUser.style.opacity = up; E.mUser.style.transform = `translateY(${10 * (1 - up)}px)`
    const streaming = t >= T_STREAM
    E.mDots.style.display = t >= T_DOTS && !streaming ? "" : "none"
    E.dots.forEach((d, i) => (d.style.transform = `translateY(${-3.5 * Math.max(0, Math.sin((t - T_DOTS - i * 0.12) * Math.PI * 2 / 0.6))}px)`))
    E.mBot.style.display = streaming ? "" : "none"
    if (streaming) E.mBotP.innerHTML = answerHTML(Math.ceil(ANSWER_WORDS * prog(t, T_STREAM, STREAM_END) + 0.001)).html
  }

  // ================= captions (screen space)
  const c1in = eo5(prog(t, 3.6, 4.05)), c1out = ei(prog(t, 5.3, 5.5))
  E.cap1.style.display = t > 3.55 && t < 5.5 ? "" : "none"
  E.cap1.style.clipPath = `inset(0 ${100 * (1 - c1in)}% 0 0)`
  E.cap1.style.opacity = 1 - c1out
  E.cap1.style.transform = `translateY(${-14 * c1out}px)`

  const c2 = t > 13.2 && t < T_OUT + 0.5
  E.cap2.style.display = c2 ? "" : "none"
  E.shade.style.display = c2 ? "" : "none"
  if (c2) {
    E.shade.style.opacity = eo(prog(t, 13.2, 13.7))
    const line = (el, a) => { const p = eo5(prog(t, a, a + 0.5)); el.style.transform = `translateY(${110 * (1 - p)}%)` }
    line(E.cap2a, 13.35); line(E.cap2b, 13.75)
    E.cap2c.style.opacity = eo(prog(t, 14.3, 14.7))
  }

  // ================= outro
  if (onOutro) {
    E.cam.style.transform = camCss(cam)
    const [fx, fy] = center(E.fab)
    const max = Math.hypot(fx, fy) + 20
    const rad = lerp(22, max, eio(prog(t, T_OUT, T_OUT + 0.75)))
    const m = `radial-gradient(circle at ${fx}px ${fy}px, black ${rad}px, transparent ${rad + 1.5}px)`
    E.outro.style.maskImage = m; E.outro.style.webkitMaskImage = m
    const o = E.o
    o.disc.style.rotate = `${spin(t)}deg`
    o.arm.style.rotate = "28deg"
    const rp = back(prog(t, T_OUT + 0.2, T_OUT + 0.8))
    o.btn.style.transform = `scale(${lerp(0.6, 1, rp)})`
    o.btn.style.opacity = eo(prog(t, T_OUT + 0.2, T_OUT + 0.5))
    const hp = eo5(prog(t, T_OUT + 0.4, T_OUT + 0.85)), up = eo5(prog(t, T_OUT + 0.6, T_OUT + 1.05))
    o.h.style.cssText = `opacity:${hp};transform:translateY(${30 * (1 - hp)}px)`
    o.sub.style.opacity = up; o.sub.style.transform = `translateY(${20 * (1 - up)}px)`
    o.top.style.opacity = eo(prog(t, T_OUT + 0.3, T_OUT + 0.7)) * 0.999
    o.overlay.style.transform = `scale(${lerp(1.0, 1.035, prog(t, T_OUT, DUR))})`
  }

  // ================= cursor (screen space)
  E.cam.style.transform = camCss(cam)
  const armGrab = () => {
    const r = E.g.btn.getBoundingClientRect()
    const px = r.left + r.width * 0.896, py = r.top + r.height * 0.12, L = r.height * 0.72 * 0.8
    const a = (armAngle * Math.PI) / 180
    return [px - Math.sin(a) * L, py + Math.cos(a) * L]
  }
  let cur = null, pressed = false, alpha = 1, clicks = []
  if (t < 2.75) {
    const g = armGrab()
    if (t < T_GRAB) { const p = eio(prog(t, 0.05, T_GRAB)); cur = [lerp(905, g[0], p), lerp(505, g[1], p)] }
    else if (t < T_DROP) { cur = g; pressed = t > T_GRAB + 0.03 && t < T_DROP - 0.04 }
    else { const p = eo(prog(t, T_DROP + 0.1, 2.4)); cur = [g[0] + 46 * p, g[1] + 40 * p]; alpha = 1 - prog(t, 2.35, 2.7) }
  } else if (t > 6.35 && t < T_PROJ + 0.5) {
    const n = center(E.navProjects)
    if (t < T_PROJ) {
      const p = eio(prog(t, 6.55, 7.3)); cur = [lerp(640, n[0] + 4, p), lerp(330, n[1] + 6, p)]; alpha = prog(t, 6.35, 6.6)
      window.__nav = [n[0] + 4, n[1] + 6]
    } else { cur = [window.__nav[0], window.__nav[1]]; alpha = 1 - prog(t, T_PROJ + 0.15, T_PROJ + 0.45) }
    clicks.push([7.38, cur]); pressed = t > 7.36 && t < 7.48
  } else if (t > 12.6 && t < 15.3) {
    const f = center(E.fab), i = center(E.input), s = center(E.send)
    const fabT = [f[0] + 3, f[1] + 5], inT = [i[0] - 60, i[1] + 6], sT = [s[0] + 3, s[1] + 5]
    cur = kf(t, [[12.6, [760, 330]], [12.92, fabT, eio], [13.1, fabT], [13.5, inT, eio], [14.35, inT], [14.64, sT, eio], [14.85, sT], [15.3, [sT[0] + 30, sT[1] + 46], eo]])
    alpha = prog(t, 12.6, 12.72) * (1 - prog(t, 14.95, 15.3))
    clicks.push([12.95, fabT], [T_SEND, sT]); pressed = (t > 12.93 && t < 13.03) || (t > T_SEND - 0.03 && t < T_SEND + 0.08)
  }
  if (cur) {
    E.cursor.style.display = ""
    E.cursor.style.opacity = alpha
    E.cursor.style.transform = `translate(${cur[0]}px, ${cur[1]}px) scale(${pressed ? 0.86 : 1})`
  } else E.cursor.style.display = "none"
  const ck = clicks.find(([ct]) => t >= ct && t < ct + 0.4)
  if (ck) {
    const p = eo(prog(t, ck[0], ck[0] + 0.4))
    E.ring.style.display = ""
    E.ring.style.transform = `translate(${ck[1][0]}px, ${ck[1][1]}px) scale(${lerp(0.3, 1.5, p)})`
    E.ring.style.opacity = 0.75 * (1 - p)
  } else E.ring.style.display = "none"

  // anything still running on a CSS animation: pin it to t
  document.getAnimations().forEach((a) => { try { a.pause(); a.currentTime = (t + 600) * 1000 } catch (e) {} })
}
window.renderAt = renderAt
window.setup = setup
