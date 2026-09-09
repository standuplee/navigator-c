# NAVER reference clone — output plan

- App root: /Users/seora/Github/navigator-c
- Sources: https://www.navercorp.com/main, /company/about, /service/portal, /service/featuredServices, /service/search, /service/advertisement, /service/commerce, /service/map, /tech/innovation, /esg/sustainability, /media/pressReleases, /media/pressReleasesDetail?seq=10034637, /investment/irUpdates, /story
- Destinations: `/`, `/main`, `/company/*`, `/service/*`, `/tech/*`, `/esg/*`, `/investment/*`, `/media/*`, `/story/*`
- Site key: navercorp-65983208
- Page key: main-c98712e4
- Research: docs/research/navercorp-65983208/main-c98712e4/
- Screenshots: docs/design-references/navercorp-65983208/<page-key>/
- Reference components: src/features/navercorp/components/
- Shared components: src/components/content/, src/components/layouts/, src/components/ui/
- Assets: public/sites/navercorp-65983208/main-c98712e4/
- Route to implement: src/app/main/page.tsx
- Existing routes are assembled through the App Router; each pathname maps to its own `src/app/**/page.tsx`.
- Shared foundation: src/app/layout.tsx and globals.css will be updated after measured extraction.
- Scope: exact public main page, responsive layout and interactions. Admin deferred by user.

## Verified status

- Installed the requested clone-website skill under .agents/skills/clone-website/.
- Copied the requested upstream Next.js 16.3.0 / React 19 / Tailwind 4 base.
- Preserved original empty package-lock.json at /private/tmp/navigator-c-original-package-lock.json.
- npm ci completed; npm run build passed on 2026-09-07.
- Reference source HTML and CSS were retained under `docs/research/navercorp-65983208/main-c98712e4/source/`.
- 328 source assets were downloaded into `public/sites/navercorp-65983208/main-c98712e4/`, including fonts and images, with zero download failures.
- Eight source-faithful React section components and a client interaction layer were generated under `src/components/sites/navercorp-65983208/main-c98712e4/`.
- Routes `/` and `/main` are assembled from the extracted sections.
- `npm run typecheck` passes.
- `npx next build --webpack` passes; the default Turbopack build is blocked by an environment process-binding error, so Webpack is the verified production build path for this workspace.

## PRD compliance

- Browser MCP is connected and used for source inspection and local visual QA.
- Extracted assets are isolated below `public/sites/navercorp-65983208/<page-key>/`.
- Interactive sections use client components; static data and display sections remain server-compatible.
- Third-party analytics and tracking are excluded.
- Admin/CMS is deferred.
- Story archive uses reusable `StoryGrid`, `StoryFilters`, and `StoryCard` components with category tabs, keyword routes, tag links, and responsive three-to-one column layout.

## Verification queue

1. Run browser scroll/click sweeps for each route at 1440px, 768px and 390px.
2. Record stateful component specs under each page's `components/` research directory.
3. Run `npm run typecheck` and `npx next build --webpack` after each assembly batch.
