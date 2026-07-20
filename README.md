# OSCILLOSCOPE

A developer portfolio built as a CRT oscilloscope / control-panel instrument instead of a typical portfolio page. Navigation is framed as numbered "channels," content renders inside bezeled monitor units, and the whole thing runs on scanlines, a boot sequence, and a hidden terminal — inspired by the instrument-panel aesthetic of Warhammer 40,000 UIs. The interface is still evolving.

## Features

- **Channel navigation** — HOME, ABOUT, STATISTICS, PROJECTS, CONTACT, each addressed like a tuned channel rather than a route
- **Boot sequence** — a real loading state that paces itself against the actual data prefetch, so every channel switch after boot hits warm cache
- **Statistics readout** — coding stats rendered as a language radar, a gauge row, and an OS usage donut chart
- **CRT chassis** — scanline overlay, monitor bezel/tick styling, and a responsive phone shell for small screens
- **Hidden terminal** — press `` ` `` / `~` to drop into a lore-flavored subshell easter egg
- **Live data** — content (about me, education, experience, projects, contact, statistics) is fetched from a companion backend API rather than hardcoded

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- [Base UI](https://base-ui.com) + [shadcn](https://ui.shadcn.com) primitives
- [TanStack Query](https://tanstack.com/query) for data fetching/caching
- [Recharts](https://recharts.org) for the statistics charts
- [Phosphor Icons](https://phosphoricons.com)

## Getting started

This app reads its content from a separate backend API — it renders nothing meaningful on its own.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the env file and point it at your API:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Run the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                      # routes (home, about, statistics, projects, contact)
components/shell/         # app chassis: header, left nav, right panel, log strip
components/sections/      # per-channel content, incl. statistics/ (charts)
components/monitor.tsx    # shared bezeled "monitor" chassis used across the shell
components/boot-sequence.tsx
components/scanlines.tsx
components/easter-egg/    # hidden terminal (`~` to toggle)
lib/api.ts                # fetch client for the backend API
lib/queries.ts            # TanStack Query definitions
lib/site-config.ts         # channel list, hero handle/role, build metadata
```
