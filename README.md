# Tic Tac Toe — React + Vite + Tailwind + shadcn-ready

This project is a Tic Tac Toe game with:
- Player vs Player (local)
- Player vs CPU with difficulty options (easy / medium / hard)
- Undo / Redo and move history
- Framer Motion animations
- Simple shadcn-like components included under `src/components/ui/` for immediate use

## Setup

1. Install dependencies
```bash
npm install
```

2. Initialize Tailwind (already configured) and start dev server
```bash
npm run dev
```

## Using shadcn CLI (optional)
To generate/replace UI components with official shadcn tooling:
```bash
npx shadcn@latest init
npx shadcn@latest add button card select
```

This will create `components/ui` components — you can keep the local ones shipped here or replace them.

## Notes
- Project uses ES Modules ("type": "module").
- tailwind/postcss configs are `.cjs` to avoid module type issues.

