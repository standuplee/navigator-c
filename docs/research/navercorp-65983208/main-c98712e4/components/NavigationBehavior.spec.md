# Navigation behavior specification

- The fixed desktop header receives `is-scroll` after the page scrolls beyond the initial header area.
- The mobile menu button toggles `.mo-nav.is-active` and `html.is-scroll-lock`; the close button reverses both states.
- Mobile section links toggle `.mo-nav__item.is-open` and show or hide their nested `.mo-nav__list2`.
- The header search button opens `.search-tab.is-active` and focuses its input. Escape closes it; delete clears the input.
- The language button toggles the adjacent language list.
- Escape closes the mobile menu and search panel.

The source markup and local reference stylesheet remain the visual source of truth; this component only attaches behavior.
