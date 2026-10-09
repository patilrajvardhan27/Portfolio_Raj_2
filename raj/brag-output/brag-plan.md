# Brag plan — Raj Patil's portfolio

## Rubric

- **What is it?** The personal portfolio of Rajvardhan (Raj) Patil, a full-stack developer at CU Boulder. It opens on a turntable: you drop the needle, music starts, and the site is revealed.
- **Who is it for?** Recruiters, collaborators, and anyone checking who Raj is and what he has shipped.
- **What sets it apart?** You don't click "enter", you drop a needle on a record. And you don't have to read it: a Claude-powered chat answers questions about him.
- **Most impressive claims (all from the site's own data):** Gradmits, built on 250K+ real admission decisions; GradBro, used by 1,500+ applicants; MessIt, 20,000+ users.
- **Visual hook:** the full-screen red turntable, tonearm dragged onto a spinning record.
- **Real UI to show:** entry gate, circular reveal, profile header (Devanagari ↔ English name, glitching avatar), About list, project rows, chat widget.
- **Tone:** `default`, leaning music-video. Confident, a little playful, no jokes forced.
- **Caption:** "My portfolio doesn't have an enter button. It has a tonearm."

## Angle

Most portfolios are a page. This one is a record you put on. The video is one play of that record: needle down, music in, the work, needle up.

## Visual identity

- Brand red `#ac0b10` → deep `#620203`, lifted `#e3262d` on dark; background zinc-950.
- Montserrat 900 uppercase, tight tracking, for display; Poppins 900 Devanagari for the name; Geist Mono / Geist Pixel for small text.
- Everything on screen is the site's real markup and compiled CSS, driven by a timeline. Overlay captions use the same type.

## Storyboard — 20.0s, 30fps, 96 BPM (bar = 2.5s)

| # | Time | Scene | On screen | Sound |
|---|---|---|---|---|
| 1 | 0.0–2.5 | **Hook: the gate** | Real entry gate. Cursor grabs the tonearm and drags it onto the record. "DROP THE NEEDLE" → "NOW PLAYING". | Vinyl crackle, needle thump at the drop |
| 2 | 2.5–5.0 | **Reveal** | Circular reveal from the record's centre onto the home page. Avatar glitches, name blurs from राजवर्धन (राज) पाटील to RAJVARDHAN (RAJ) PATIL. Slow push-in. Caption: "Full-stack developer. CU Boulder." | Groove enters on the downbeat |
| 3 | 5.0–7.5 | **Who he is** | Scroll to ABOUT: "Started coding to help myself fight problems that I observed" and the "Cooked up" list. Cursor heads to PROJECTS in the nav. | Groove, bass in |
| 4 | 7.5–12.5 | **The numbers** | Three beats, real project rows beside giant figures: 250K+ admission decisions (Gradmits) · 1,500+ applicants (GradBro) · 20,000+ users (MessIt). | Stab on each number |
| 5 | 12.5–17.5 | **Ask it** | Chat button clicked, widget opens, "What does Raj do?" typed and sent, answer streams. Caption: "Don't read it. Ask it." | Soft key ticks, send blip, in key |
| 6 | 17.5–20.0 | **Outro** | Red closes back in. Record, "DROP THE NEEDLE", portfolio-raj-2.vercel.app. | Final chord, crackle tail |

## Music

Original, synthesized for this video: 96 BPM, D minor, dusty electric-piano chords, round bass, soft kick/snare/hats. Effects (needle thump, number stabs, key ticks, send blip) are tuned to the key and mixed under the music.
