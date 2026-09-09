# NAVER reference site topology

## Routes

| Reference pathname | App Router route | Interaction model |
| --- | --- | --- |
| `/main` | `/`, `/main` | scroll-driven, time-driven, click-driven |
| `/service/featuredServices` | `/service/featuredServices` | scroll-driven, click-driven |
| `/service/search` | `/service/search` | scroll-driven |
| `/service/advertisement` | `/service/advertisement` | scroll-driven |
| `/service/commerce` | `/service/commerce` | scroll-driven |
| `/service/map` | `/service/map` | scroll-driven |
| `/tech/innovation` | `/tech/innovation` | scroll-driven, click-driven |
| `/media/pressReleasesDetail?seq=10034634` | `/media/pressReleasesDetail` | click-driven |

## Shared topology

- `SiteHeader`, mobile navigation and `SiteFooter` are reference adapter components.
- `SiteShell`, `ArticleDetailPage`, `ServiceDetailPage` and `ServiceCardList` are reusable application components.
- Reference-specific content records live under `src/features/navercorp/data/`.
- Local assets are isolated under `public/sites/navercorp-65983208/`.

## Navigation naming

- `서비스` is presented as `우리의 사역` and routes to `/service/featuredServices`.
- `기술` is presented as `우리의 활동` and routes to `/tech/innovation`.
