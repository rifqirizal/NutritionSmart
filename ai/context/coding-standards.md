# Coding Standards

## General Rules

* TypeScript Strict Mode wajib aktif.
* Hindari penggunaan `any`.
* Semua API menggunakan DTO.
* Semua database access menggunakan Prisma ORM.
* Semua code harus production-ready.
* Semua code harus mudah dipelihara (maintainable).
* Hindari duplikasi kode (DRY Principle).
* Gunakan reusable components dan reusable services.
* Prefer simplicity over complexity.

---

## Technology Standards

### Frontend

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Hook Form
* Recharts
* Zod

### Backend

* Next.js Route Handlers
* Server Actions
* Prisma ORM

### Database

* PostgreSQL

### AI

* Google Gemini

---

## Naming Convention

### Component

PascalCase

Example:

```tsx
FoodScanner.tsx
NutritionCard.tsx
```

### Function

camelCase

Example:

```ts
calculateNutrition()
generateRecommendation()
```

### Variable

camelCase

Example:

```ts
totalCalories
dailyNutrition
```

### Constant

UPPER_SNAKE_CASE

Example:

```ts
MAX_UPLOAD_SIZE
DEFAULT_CALORIE_TARGET
```

### API Route

kebab-case

Example:

```text
/api/food-scan
/api/weekly-report
```

### Database

snake_case

Example:

```sql
daily_summaries
meal_nutritions
```

---

## Folder Structure

```text
src/
├── app/
├── components/
├── features/
├── services/
├── repositories/
├── lib/
├── hooks/
├── types/
├── validators/
└── constants/
```

### Responsibilities

#### components

Reusable UI Components

#### features

Feature-specific logic

#### services

Business logic

#### repositories

Database access layer

#### lib

Third-party integrations

#### validators

Zod validation schemas

#### types

Shared TypeScript types

---

## Server and Client Rules

AI integrations must run on the server.

Never call Gemini API directly from client components.

Use:

* Server Actions
* Route Handlers
* Backend Services

Client components are responsible only for:

* Rendering UI
* User interactions
* Form handling

Never access secrets from client components.

---

## Database Rules

Use Prisma ORM for all database operations.

Never execute raw SQL unless explicitly required.

Primary keys must use UUID.

All tables must include:

```sql
created_at
updated_at
```

Relationships must be defined in Prisma Schema.

Use database constraints whenever possible.

Add indexes on:

* foreign keys
* frequently queried fields

Never store derived calculations unless required for performance.

---

## API Standards

Use REST conventions.

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

### Validation

All requests must be validated using Zod.

Validate:

* Body
* Query Parameters
* Route Parameters

before processing.

---

## Form Standards

Use:

* React Hook Form
* Zod

All forms must include:

* Loading state
* Error state
* Success state
* Validation messages

---

## Error Handling

All APIs must:

* Validate input
* Handle expected errors
* Handle unexpected errors
* Log server-side errors

Never expose:

* Stack traces
* Internal exceptions
* Sensitive information

to users.

---

## Security

### Authentication

* Password wajib hash menggunakan bcrypt.
* JWT wajib disimpan dalam HttpOnly Cookie.
* Session validation wajib dilakukan pada protected routes.

### Authorization

* Validate user ownership before accessing data.
* Never trust client-provided user IDs.

### API Security

* Validate all input.
* Sanitize user-generated content.
* Rate limit public endpoints when necessary.

---

## Environment Variables

Always use:

```ts
process.env.GEMINI_API_KEY
process.env.DATABASE_URL
process.env.JWT_SECRET
```

Never:

* Hardcode credentials
* Commit secrets
* Expose secrets to frontend

Environment variables must only be accessed from server-side code.

---

## AI Development Rules

Always read all files inside:

```text
.ai/context/
```

before generating output.

Context files have higher priority than module files.

If module files conflict with context files:

Follow context files.

Never generate features outside MVP scope.

Always reuse existing database entities when possible.

Avoid introducing new dependencies unless necessary.

Generate:

* Production-ready code
* Scalable architecture
* Maintainable code
* Well-structured code

Document assumptions when information is missing.

---

## Code Quality

All code must:

* Follow SOLID principles
* Follow DRY principles
* Be strongly typed
* Avoid dead code
* Avoid unused imports
* Avoid unnecessary abstractions

Prefer readability over cleverness.

---

## Testing Standards

Generate test scenarios for:

* Positive cases
* Negative cases
* Edge cases

Test:

* APIs
* Business logic
* Validation

Critical business rules must always be covered.

---

## Git Convention

### Feature

```text
feat:
```

Example:

```text
feat: add food scan module
```

### Fix

```text
fix:
```

Example:

```text
fix: resolve nutrition calculation issue
```

### Refactor

```text
refactor:
```

### Documentation

```text
docs:
```

### Testing

```text
test:
```

### Chore

```text
chore:
```
