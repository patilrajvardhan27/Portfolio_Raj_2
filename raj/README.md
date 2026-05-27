This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Set up environment variables

Copy `.env.local` and fill in your Anthropic API key (required for the AI chat widget):

```bash
cp .env.local .env.local
```

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## AI Chat Widget

A floating chat widget (bottom-right corner) lets visitors ask questions about Raj. It's powered by the [Claude API](https://anthropic.com) via the [Vercel AI SDK](https://sdk.vercel.ai).

**How it works:**
- Visitors click the chat button → type a question
- Request hits `/api/chat` (Next.js route handler)
- Claude streams a response using a system prompt built from Raj's real data (experience, projects, skills)

**To update the AI's knowledge**, edit:
```
src/features/portfolio/data/chat-system-prompt.ts
```

**Model used:** `claude-haiku-4-5` (fast and cheap — ideal for a chat widget)

---

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts          # Chat API route
│   └── (app)/
│       └── layout.tsx             # Includes ChatWidget
├── components/
│   └── chat-widget.tsx            # Floating chat UI
└── features/portfolio/data/
    ├── chat-system-prompt.ts      # AI system prompt about Raj
    ├── user.ts
    ├── experiences.ts
    └── projects.ts
```

---

## Deploy on Vercel

Set `ANTHROPIC_API_KEY` in your Vercel project's environment variables, then deploy normally.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- Trigger deploy v3 -->
