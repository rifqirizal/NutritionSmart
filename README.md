# NutriSmart - AI-Powered Nutrition Tracker

NutriSmart is a modern web application that helps you track your daily nutritional intake using the power of AI. Simply scan a photo of your food, and NutriSmart will automatically analyze its calories, protein, carbohydrates, and fat content, tailored to your personal fitness goals.

## Features

- **AI Food Scanning**: Upload a photo of your meal and get an instant breakdown of its nutritional value using Google Gemini.
- **Personalized AI Recommendations**: Get actionable advice based on your scanned food and your specific fitness goals (e.g., losing weight, gaining muscle).
- **Daily Dashboard**: Track your daily intake of calories, protein, carbs, and fats in a beautiful, glassmorphism-inspired UI.
- **Goal Tracking**: Set personal targets for your weight and fitness journey.
- **Dark Mode**: Fully supported dark mode for a seamless user experience.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL (Supabase/Neon)
- **AI Integration**: Google Gemini 2.5 Flash
- **State Management**: React Query (TanStack Query)
- **Forms & Validation**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API Key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file:
   ```env
   DATABASE_URL="your_postgresql_database_url"
   DIRECT_URL="your_postgresql_direct_url"
   GEMINI_API_KEY="your_google_gemini_api_key"
   JWT_SECRET="your_jwt_secret"
   ```
4. Run database migrations:
   ```bash
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
