# PressReleaseCard

- Interaction model: `static` display with navigation link.
- Component classification: RSC; no browser state or event handlers.
- Card anatomy: optimized local `next/image` visual, category/date metadata, title, and optional tag list.
- Layout: 16:9 visual, body minimum height `180px`, 24px body padding, 8px radius, hover lift `translateY(-4px)`.
- Route contract: links to `/media/pressReleasesDetail?seq={seq}` so every archive item resolves through the shared detail template.
