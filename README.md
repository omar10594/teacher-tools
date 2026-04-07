# Teacher Tools

Fast and mobile-friendly web app for teacher workflows.

Current MVP includes one tool:
- Weekly Planning Trigger: sends startDate and weekNumber to an n8n webhook.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn-compatible component setup
- React Hook Form + Zod validation
- Docker multi-stage build for self-hosting

## Devcontainer First Workflow

1. Open this workspace in VS Code.
2. Run Reopen in Container.
3. Wait for post-create command to install dependencies.
4. Copy .env.example to .env.local and set your values.
5. Run npm run dev.

The app runs at http://localhost:3000.

## Environment Variables

Use .env.local for local development.

Required values:
- N8N_WEBHOOK_URL: webhook endpoint that receives startDate and weekNumber.
- AUTH_SECRET: random secret used to sign auth tokens.
- AUTH_ALLOWED_EMAILS: comma-separated allowlist of emails that can access private tools.
- RESEND_API_KEY: API key for sending magic links by email.
- AUTH_FROM_EMAIL: sender used for magic-link emails.

Optional:
- NEXT_PUBLIC_APP_URL: public URL for future callback links.

## Private Login (Magic Link)

The app supports private access without registration via email magic links.

How it works:
- Public pages stay accessible.
- Routes under /tools are private.
- /api/weekly-plan rejects requests without a valid session.
- Login starts at /login and sends a magic link email.

Required setup:
1. Configure AUTH_SECRET with a long random value.
2. Configure AUTH_ALLOWED_EMAILS.
3. Configure RESEND_API_KEY and AUTH_FROM_EMAIL.
4. Set NEXT_PUBLIC_APP_URL to your public URL in production.

## Self-hosted with Docker Compose

1. Create a .env file next to docker-compose.yml.
2. Set N8N_WEBHOOK_URL in that file.
3. Build and start:

	 docker compose up -d --build

4. Check logs:

	 docker compose logs -f app

The container listens on port 3000. HTTPS and public exposure are handled outside this project.

## GitHub Actions

- CI workflow: .github/workflows/ci.yml
	- Runs on pull requests and pushes to main.
	- Executes install, lint, typecheck, and build.

- Container workflow: .github/workflows/container.yml
	- Runs on pushes to main and manual dispatch.
	- Builds and pushes image to GHCR.

## Project Scripts

- npm run dev
- npm run lint
- npm run typecheck
- npm run build
- npm run start

## Request Payload Sent to n8n

JSON body:

{
	"startDate": "2026-04-13",
	"weekNumber": 30
}

