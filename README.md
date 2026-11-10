# iFranchise Icon Studio

An internal icon library and browser for iFranchise products, built around the documented iFranchise Icon Language.

## Start

Install dependencies with `npm install`, then run `npm run dev`. Open the local address printed by Next.js. Production builds use `npm run build` and `npm start`.

## Library structure

- The browser includes Font Awesome Free Solid, Regular, and Brands icons via the official packages, with duplicate aliases removed; Font Awesome Pro assets are not included.
- `src/icons/catalog.ts` combines metadata and paths into the searchable catalogue.
- `src/icons/expanded.ts` adds category-owned glyphs using the same authoring helper.
- `src/icons/BaseIcon.tsx` renders accessible glyphs on the 24px grid.
- `src/icons/index.ts` exports stable, named React components with per-icon path data.
- `src/icons/quality.ts` checks metadata completeness, unique names, and path complexity.
- `src/components/IconStudio.tsx` contains browsing, search, previews, and export actions.
- `src/components/IconPlayground.tsx` previews size, stroke, color, background, hover, and motion.
- `src/app/icons/[slug]` serves shareable icon URLs.
- `/docs` documents geometry, stroke, the family signature, workflow, and accessibility.
- `/playground` provides a live preview and copyable React example.

See the [Icon Language guide](/docs) for design rules, naming, quality checks, accessibility, and animation guidance.
