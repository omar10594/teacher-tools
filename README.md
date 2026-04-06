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

Optional:
- NEXT_PUBLIC_APP_URL: public URL for future callback links.

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

