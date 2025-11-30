# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (runs on http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint`

## Architecture

This is a Next.js 16 app using the App Router with:

- React 19
- TypeScript (strict mode)
- Tailwind CSS 4 with PostCSS
- Geist font family via next/font

### Project Structure

- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page
  - `globals.css` - Global Tailwind styles
- `public/` - Static assets

### Path Alias

`@/*` maps to the project root (e.g., `@/app/page` for `./app/page`).

## Code Style

Uses Prettier with: single quotes, semicolons, 2-space tabs, trailing commas (ES5), 80-char line width.

## Communication

Please use Japanese exclusively when conversing with me.
