# ⚡ Saylo — Gen-Z English Learning Platform

> **"Say it. Mean it. Own it."**  
> *"Use English. Don't study English."*

Saylo is a modern, social, expressive, and personalized English-learning web platform engineered for Gen-Z learners. It replaces sterile grammar drills and cartoonish owl mascots with authentic internet culture, situational roleplays, nuanced tone transformations, contextual Word DNA, and invisible AI coaching.

---

## 🏗️ Project Architecture

```text
vibe/
├── frontend/     # React 19 + Vite + TailwindCSS v4 + Web Speech API (Port 5173)
├── backend/      # Node.js + Express + MongoDB/Mongoose + AI Abstraction Layer (Port 5000)
└── admin/        # React 19 + Vite + TailwindCSS v4 Admin & AI Ops Panel (Port 5174)
```

---

## 🌟 The Four Connected Learning Pillars

### 1. 🧠 Vocabulary (In The Wild & Word DNA)
- **Caught in the Wild**: Language as it appears naturally in group chats, social commentary, and podcasts.
- **Word DNA**: Every expression features an intuitive breakdown:
  - Formality Scale (1–10)
  - Energy Scale (1–10)
  - Commonness Scale (1–10)
  - Similar Vibes & Tone
  - Guardrails: *"Don't use in..."* (e.g. formal business contracts or academic theses)
  - Bilingual Assistance (मतलब & हिंदी उदाहरण)
  - Audio pronunciation powered by Web Speech Synthesis.
- **Embedded "Try It" Evaluation**: Users respond to conversational prompts using the word and receive instant feedback.

### 2. 📖 Reading (Chat & Branching Stories)
- **Chat Stories**: Real texting threads (e.g. Maya & Sam debating Friday plans, group project ghosting) with tone analysis and comprehension intuition checks.
- **Interactive Branching Stories**: Situational scenarios (e.g. *Running late to class: friend texts "where are you 😭"*) where learners choose between casual, stiff, and passive options, with instant explanations for why specific choices sound natural.
- **Culture Reads & Essays**: Engaging articles examining the evolution of modern language and workplace communication.
- **Universal "Explain This" Modal**: Select or tap any word to decode its meaning, casual vs. formal variants, Hindi translation, and usage boundaries.

### 3. ✍️ Create (Writing Redefined)
- **Same Thought, Different Vibes**: Input any standard sentence and instantly remix it across 7 distinct communication tones:
  - *Neutral*, *Casual*, *Funny*, *Professional*, *Gentle*, *Confident*, and *Gen-Z*.
  - Users pick the vibe that sounds most like them to calibrate their personal voice.
- **Creative Scenarios**: Prompts for *Text someone*, *Caption this*, *Hot take*, *Continue the story*, *Make it funnier*, *Make it professional*, and *Reply to a message*.
- **Pedagogical AI Feedback**:
  - `YOUR VERSION`: *Yesterday I go market.*
  - `BETTER`: *Yesterday I went to the market.*
  - `WHY?`: *Because you're talking about something that concluded in the past.*
  - `TRY AGAIN`: *Yesterday I ______ to the market.* (Interactive fill-in-the-blank practice drill).

### 4. 🎙️ Talk (DROP ME IN Situational Speaking)
- **No Robotic Drills**: Completely replaces "repeat after me" with real-world situational roleplays (Melbourne café, JFK airport customs, rooftop party banter, tech job interviews, gaming lobby coordination).
- **Voice-Enabled**: Speech-to-Text via Web Speech Recognition (`webkitSpeechRecognition`) + Text-to-Speech via `SpeechSynthesis` with real-time pulsating waveform animations and text fallback.
- **6 Configurable AI Personalities**:
  - **Alex**: Chill friend (casual & relatable)
  - **Maya**: Professional mentor (career & confidence)
  - **Kai**: Gamer & streamer (high energy discord banter)
  - **Rio**: Funny & chaotic (quick wit & comedic timing)
  - **Emma**: Patient conversationalist (gentle & encouraging)
  - **Noah**: Tech & logic partner (analytical & curious)
- **Post-Call Debrief**:
  - Telemetry: *Fluency %*, *Vocabulary %*, *Grammar %*, *Naturalness %*.
  - *Quick Fixes*: "You said" vs. "More natural" + reasoning.
  - Interactive *"Say it again 🔊"* voice repetition drills.

---

## 🎮 Vocabulary Arcade (6 Game Modes)

1. **Word Rush**: Fast-paced vocabulary decisions against a 45-second clock.
2. **Word Detective**: Spot the missing slang and tone inside authentic conversation snippets.
3. **Word Battle**: Guess the target word from clues while avoiding taboo forbidden words.
4. **Guess the Vibe**: Match phrases to subtle social scenarios and formality rules.
5. **Say It Better**: Transform awkward textbook English into effortless natural speech.
6. **Context Clash**: Compare two expressions and choose which fits the social situation.

---

## 🛡️ Admin & AI Operations Panel (`/admin`)

- **Telemetry Dashboard**: Tracks DAU, WAU, average session duration, and completion rates across all 4 learning pillars.
- **Content Management**: Complete CRUD over vocabulary entries, Word DNA metrics, readings, writing prompts, and scenarios.
- **AI Lab**:
  - Edit and test system prompts for each of the 6 AI characters.
  - Supervised AI Content Synthesis & Approval queue (generate, preview in sandbox, approve and publish directly to learner app).
- **User Management & Trust & Safety**: Learner activity roster, level tracking, account suspension, and report moderation queue.
- **Gamification Rules**: XP economy settings, streak rules, and weekly mission quests.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ (tested on v24)
- MongoDB running locally on `127.0.0.1:27017`

### 1. Backend Setup & Database Seeding
```bash
cd vibe/backend
npm install
npm run seed     # Populates 60 vocabulary items, 12 stories, 20 prompts, 15 scenarios, 6 AI personas, 6 games, quests
node src/server.js
# Backend runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd vibe/frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Google Sign-In Configuration

Set `GOOGLE_CLIENT_ID` in `vibe/backend/.env` and `VITE_GOOGLE_CLIENT_ID` in
`vibe/frontend/.env` to the Google OAuth web client ID. Add your frontend
origins (for local development, `http://localhost:5173`) to the client's
authorized JavaScript origins in Google Cloud Console. The backend verifies
Google ID tokens and issues the app's normal session token; a Google client
secret is not used for this flow and must never be exposed in the frontend.

### 3. Admin Panel Setup
```bash
cd vibe/admin
npm install
npm run dev
# Admin Panel runs on http://localhost:5174
```

---

## 🔑 Demo & Admin Credentials

| Role | Email / Username | Password | Notes |
|---|---|---|---|
| **Learner** | `demo@vibe.app` | `password123` | Pre-loaded with Level 13, 12-day streak, 1,284 XP, customized interests |
| **Administrator** | `admin@vibe.app` | `adminpassword123` | Full access to Admin & AI Ops panel |

---

## 🎨 Design System & Color Palette

- **Background**: Deep charcoal `#09090B` / `#111113`
- **Surface & Cards**: `#121215` / `#18181B` with subtle glassmorphic borders
- **Primary Text**: Off-white `#F5F5F5`
- **Secondary Text**: Muted zinc `#A1A1AA`
- **Primary Accent**: Electric Violet `#8B5CF6` / `#A78BFA` (focus, selections, primary actions)
- **Secondary Accents**:
  - Electric Cyan `#22D3EE` (technology, live voice telemetry)
  - Hot Pink `#F472B6` (slang, social energy)
  - Lime `#A3E635` (achievements, games)
  - Warm Orange `#FB923C` (streaks 🔥, bilingual assistance)
- **Typography**: Clean, confident sans-serif (*Plus Jakarta Sans* / *Inter*).
