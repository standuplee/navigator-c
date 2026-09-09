# SectionType

- Interaction Model: `scroll-driven`
- Component classification: RCC (`ServiceDetailPage` owns scroll progress and IntersectionObserver)
- Source structure: `.section-type__page` → `.section-type__content` → icon, title, description, home CTA, `.section-type__img-view` phone visual.
- Desktop layout: text content occupies the right half; the phone visual occupies the left half inside a light gray section.
- Mobile layout: text stacks above the phone visual; the phone is centered below the copy.
- State A: section enters with the phone and copy visible; the progress bar is at the current document position.
- State B: IntersectionObserver adds `.is-visible` to following content sections, transitioning opacity from `0` to `1` and translating Y from `56px` to `0`.
- Local asset source: `public/sites/navercorp-65983208/service/search/`.
