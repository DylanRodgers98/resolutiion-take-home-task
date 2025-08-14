# Resolutiion Take Home Task

This is a Next.js 15 App Router app created using Create T3 App to bootstrap Next.js, Drizzle ORM, tRPC and NextAuth.

## Prerequisites

- Docker must be installed

## Instructions

1. Start database by running `./start-database.sh` (for Windows there are instructions within that script).
2. Create tables in database by running `db:push` using whatever package manager script runner you use (e.g. bun, yarn, npm, pnpm).
3. Start app by running `dev`
4. Open `http://localhost:3000` in your browser

## Available operations

### Unprotected

- Log in with GitHub
- View books available in system

### Protected

- Add book
- Toggle book as read/unread

## If I had more time, I would

- Add tests
- Use a React provider instead of prop-drilling
  - Note: I spent too much time on this for session/login information, but get myself stuck with server vs client components. This is also the reason I have not added tests, because I unfortunately wasted too much time.
