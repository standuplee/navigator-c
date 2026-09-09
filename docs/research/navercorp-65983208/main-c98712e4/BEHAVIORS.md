# NAVER main behavior bible

- Headline and middle promotion carousels autoplay every 4 seconds, expose pagination, and include pause/play controls. Reduced-motion users receive no autoplay.
- Header is fixed and receives the source scroll state after the page moves beyond the initial viewport.
- Mobile menu locks document scrolling and opens nested navigation groups independently.
- Search opens as a panel and moves focus to its input. Escape closes it and the clear button empties the field.
- Technology panels use click, Enter, Space, and arrow-key activation with a 0.6s width transition from the source stylesheet.
- Partner support uses keyboard-selectable ARIA tabs. Only the selected panel is exposed.
- News cards are positioned as a measured masonry grid on desktop and become a normal vertical flow on mobile.

Measured responsive widths: desktop 1440px, tablet 768px, mobile 390px. The source switches the headline/header composition at 767px and the technology imagery at 1023px.
