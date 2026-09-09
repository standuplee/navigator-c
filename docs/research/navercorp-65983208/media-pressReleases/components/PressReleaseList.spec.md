# PressReleaseList

- Interaction model: `click-driven` and `static` list rendering.
- Component classification: RCC (`'use client'`) for year/month filters, search state, and pagination.
- State A: `전체 연도`, disabled `전체 월`, page 1, all records.
- State B: selecting `2026` enables month options; changing search text or month resets page to 1; pagination swaps the visible eight-card slice.
- Layout: toolbar max width `1280px`, 24px desktop padding, 1-column mobile toolbar; card grid is two equal columns at desktop and one column below 768px.
- Reusable child: `PressReleaseCard` remains an RSC and receives a typed `PressRelease` object.
