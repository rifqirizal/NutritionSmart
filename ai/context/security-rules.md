# Security Rules

## Secret Management

The following values are secrets:

* GEMINI_API_KEY
* DATABASE_URL
* JWT_SECRET

Never:

* Hardcode secrets
* Print secrets
* Commit secrets to git
* Expose secrets to frontend
* Return secrets in API responses

Always:

* Load secrets from environment variables
* Use server-side access only
* Validate environment variables on startup

## Frontend Rules

Client components must never access:

* GEMINI_API_KEY
* DATABASE_URL
* JWT_SECRET

AI requests must go through backend APIs or server actions.

## Git Rules

Never commit:

* .env
* .env.local
* .env.production

Commit only:

* .env.example

## Code Generation Rules

When generating code use:

process.env.GEMINI_API_KEY

Never generate actual secret values.

## API & Payload Security

Since images are sent as Base64 strings to the backend:
* Next.js API Routes must handle large payloads gracefully but enforce limits (e.g., standard Vercel 4.5MB limit).
* Client-side compression (WebP) MUST happen before sending the request to avoid memory limits and payload rejection on Vercel serverless functions.
* Never trust client payload size blindly; always ensure the backend does not crash on malformed Base64 strings.
