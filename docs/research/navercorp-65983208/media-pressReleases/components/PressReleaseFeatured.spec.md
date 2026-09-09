# PressReleaseFeatured

- Interaction model: `click-driven` (previous/next controls)
- Component classification: RCC (`'use client'`) because the active carousel index is stateful.
- Source states: initial index 01 with previous disabled; subsequent index increments and updates the card link, image, title, date, and index label; final index disables next.
- Layout: desktop grid `120px minmax(0,1fr) 96px`, gap `24px`, card minimum height `360px`, radius `12px`; mobile one column with visual minimum height `220px`.
- Accessibility: section label `주요 보도자료`, controls expose `이전 배너`/`다음 배너`, disabled controls prevent out-of-range navigation.
