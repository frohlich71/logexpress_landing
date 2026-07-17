# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing landing for **LogExpress — Serviços de Entregas** (moto-fretamento
for compounding pharmacies and labs in São Paulo / Grande SP). Static site, no backend.
UI copy is in **Portuguese (pt-BR)** — keep new user-facing text in Portuguese.

Stack: **Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + framer-motion**.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # tsc -b (typecheck) then vite build -> dist/
npm run lint     # oxlint (NOT eslint)
npm run preview  # serve the production build locally
```

There is no test suite. `npm run build` is the correctness gate — it runs `tsc -b`, so a
type error fails the build. Lint uses **oxlint** with the react/typescript/oxc plugins
(`react/rules-of-hooks` is an error).

## Architecture

- `src/App.tsx` composes the whole page as a fixed vertical sequence of section
  components (`Navbar → Hero → Advantages → HowItWorks → CoverageMap → Plans → Partners →
  Contact → Footer`). One component per section under `src/components/`.
- **Content lives in `src/data/`, separate from presentation.** Edit copy/data there, not
  in components: `site.ts` (contact info — see placeholders below), `plans.ts`,
  `advantages.ts`, `ceps.ts` (zones + CEP ranges + delivery windows), `partners.ts`.

### Theming (light/dark)

- Theme is `<html data-theme="dark|light">`, applied by an inline script in `index.html`
  **before paint** (reads `localStorage.theme`, defaults to dark) to avoid a flash.
- `src/hooks/useTheme.ts` mirrors/persists it and animates the switch via the View
  Transitions API (circular clip-path reveal from the click origin).
- Colors are Tailwind v4 `@theme` tokens in `src/index.css`. Semantic tokens
  (`--color-bg`, `--color-fg`, `--color-card`, …) point at per-theme CSS variables that
  are swapped in the `[data-theme='light']` / dark blocks — so utilities like `bg-bg` /
  `text-fg` follow the active theme automatically. Brand yellow (`--color-brand-*`) and
  the map zone colors (`--color-zone-*`) are identical in both themes.

### Coverage map (the centerpiece)

- `src/components/CoverageMap.tsx` renders an interactive 3D-tilted SVG map of the 39 real
  municipalities of the RMSP, grouped/colored by service zone, with hover-per-region and
  CEP lookup.
- `src/data/rmspGeo.ts` is **auto-generated — do not edit by hand.** Regenerate with
  `node scripts/gen-map.mjs`, which fetches IBGE municipal meshes (API v3, intermediate
  quality; needs internet), fixes ring winding, and projects to SVG via `d3-geo` Mercator.
  To move a municipality to a different zone, edit the `ZONE` map (IBGE code → zone) at the
  top of `scripts/gen-map.mjs` and rerun it.
- Zone → color comes from `--color-zone-*` in `src/index.css`; zone name/description/window
  and CEP ranges come from `src/data/ceps.ts`. `ZoneId` in `ceps.ts` is the source of truth
  for the set of zones.

## Gotcha: contact placeholders

`src/data/site.ts` still ships placeholder contact details (`(11) 0000-0000`,
`contato@logexpress.com.br`, `5511900000000`, …). The Contact section's WhatsApp QR code
is generated from `whatsappNumero`. Replace these with real data before any production deploy.

## Deploy

Output is 100% static (`dist/`). Build command `npm run build`, output dir `dist` — works
on Vercel/Netlify/Cloudflare Pages/GitHub Pages.
