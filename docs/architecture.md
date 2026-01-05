# Architecture

## Стек

- Next.js 14 (App Router)
- TypeScript
- Tailwind + shadcn/ui
- Framer Motion
- Zustand
- Supabase
- Vercel

## Database Schema

\`\`\`sql
tasks (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
)
\`\`\`

## Deployment

- Vercel - production + preview
- Supabase - PostgreSQL
- MCP integrations
