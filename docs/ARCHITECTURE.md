# Component architecture

The project keeps reusable UI primitives separate from a reference site adapter.

```text
src/
  app/                         # Next.js routes
  components/
    content/                   # Reusable content layouts (ArticleDetailPage)
    layouts/                   # Reusable shells (SiteShell)
    ui/                        # Shared atoms and controls
  features/
    navercorp/                 # NAVER reference adapter and data
      components/              # Extracted reference-specific composition
      data/                    # Reference content records
  hooks/                       # Shared React hooks
  lib/                         # Library clients and configuration
  store/                       # Global state boundary
  types/                       # Shared TypeScript contracts
  utils/                       # Shared helpers
```

`components/content` and `components/layout` must not depend on NAVER-specific data. A new reference site should provide its own adapter under `features/<site>` and compose the shared components there. The extracted HTML and CSS stay under `components/sites/<reference-id>` so the source-faithful layer can be replaced without changing the shared package.
