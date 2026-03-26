# SpeakEng

An AI-powered English learning platform built with Next.js and Google Gemini.

## Features

- **Level Assessment** — AI-graded 20-minute test to determine your CEFR level (A1–C2)
- **Curated Lessons** — Personalized curriculum based on your level
- **AI Speaking Practice** — Real-time conversation practice with grammar and fluency feedback
- **Writing Studio** — Submit essays for sentence-by-sentence AI corrections
- **Progress Tracking** — XP system, daily streaks, skill breakdown, and achievement badges
- **AI Mock Interview** — Practice job interviews with instant AI coaching

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/) — Auth & Database
- [Google Gemini AI](https://ai.google.dev/) — AI feedback engine
- [Lucide React](https://lucide.dev/) — Icons

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/speakeng.git
cd speakeng
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |
| `GEMINI_API_KEY` | Your Google Gemini API key |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Push this repo to GitHub
2. Import the project on Vercel
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy

## Project Structure

```
app/
├── page.js              # Landing page
├── dashboard/           # User dashboard (auth required)
├── practice/            # AI speaking practice
├── progress/            # Progress tracking & analytics
├── pricing/             # Pricing page
├── login/ register/     # Authentication
├── interview/ writing/  # AI interview & writing studio
├── test/ lessons/       # Level test & curated lessons
├── components/          # Shared UI components
│   ├── layout/Sidebar.js
│   └── DashboardLayout.js
└── lib/
    ├── supabase.js      # Supabase client
    └── dummyData.js     # Mock data for UI
```
