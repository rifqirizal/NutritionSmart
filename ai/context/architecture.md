# System Architecture

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* Shadcn UI
* Recharts
* React Query (@tanstack/react-query)
* PWA

---

## Backend

* Next.js API Routes
* Server Actions

---

## Database

* PostgreSQL
* Prisma ORM

---

## AI Layer

Gemini Vision

Responsibilities:

* Food Recognition
* Nutrition Estimation (Calories, Macros)
* Recommendation Generation & Advice
* Multi-language Translation (ID, EN)

---

## Infrastructure

Frontend:
Vercel

Database:
Neon PostgreSQL / Supabase

Storage:
PostgreSQL (Images are compressed client-side via canvas to WebP and stored natively as Base64 strings to bypass Vercel EROFS read-only file system limitations). No external Cloud Storage or local `/public/upload` is used.

---

## High Level Flow

User Upload Photo

↓

Frontend

↓

API

↓

Gemini Vision

↓

Nutrition Result

↓

Database

↓

Dashboard & Report

## Environment Variables

Required:

- GEMINI_API_KEY
- DATABASE_URL
- JWT_SECRET

All environment variables must be loaded from .env.local.

Never expose environment variables to frontend.