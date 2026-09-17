# Backend Practice Starter

Reusable starter based on the Day 01 Node.js + TypeScript + Express + Drizzle + PostgreSQL + Docker setup.

## Setup

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

Start PostgreSQL first:

```bash
docker compose up -d
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - TypeScript build
- `npm run db:push` - push Drizzle schema
- `npm run db:studio` - open Drizzle Studio

## Starting a new practice task

Copy this folder and rename it for the task. Keep the setup, then add only the modules/concepts needed for that task.
