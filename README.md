# PRŻ PROJ

Strona dyplomowa o Siergieju Paradżanowie — projekt Valeriii Malashevskiej (2024), zakodowany z makiety Figma: interaktywne plakaty, galeria kolaży, filmy, fakty i kraje.

Website for Valeriia Malashevska's 2024 diploma project about Sergei Parajanov, built from the Figma design: interactive poster constructors, a collage gallery, film pages, a facts accordion and countries.

## Stack

Vite + TypeScript, plain HTML/CSS with custom properties, [Motion](https://motion.dev) for springs, a small History-API router with View Transitions. No framework.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on :4173
```

## Layout

- `src/router.ts`, `src/main.ts` — routes (see `SPEC.md` §2), page lifecycle, page transitions.
- `src/lib/` — templating, `<picture>` helper, `Stepper` (numbered Figma frames as states of one screen, `?krok=N`), `Glide` (spring-driven strips), motion presets.
- `src/ui/`, `src/styles/` — shared header, arrows, «go back», section bar; tokens, fonts, base.
- `src/pages/<section>/` — home, art (poster constructors), galeria, filmy, fakty, kraje.
- `scripts/assets.mjs` — Figma renders → AVIF/WebP 1×/2× + manifest; `scripts/compare.mjs` — pixel diff of a route against a Figma frame export.
- `qa/*.check.mjs` — Playwright interaction checks per section; `qa/QA-PLAN.md`.
- `SPEC.md` — tokens, routes, state series, animation table, decisions and open questions. `figma/inventory/` — per-section design inventory and prototype reactions.

Design pixels are written as `calc(N * var(--u))`: one unit is one pixel of the 1512×982 Figma frame, scaled to the viewport.

## Deploy

Netlify (`netlify.toml`: SPA fallback, cache headers): `npx netlify-cli deploy --prod`.
