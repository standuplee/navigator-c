# NAVER main design tokens

- Font stack: `InterVariable, NanumHuman, Pretendard, sans-serif`.
- Body background: white; primary text: `#1a1d24`.
- Main content desktop side inset: 48px inside a 1280px content frame at 1440px viewport.
- Header: fixed, 85.6px measured height, 12px vertical padding; transition uses a 0.4s cubic-bezier easing.
- Main headline: 28px top padding and 32px bottom padding inside a 100px top offset.
- Section rhythm: 96px vertical padding for news, technology and partner sections; 48px for the middle banner.
- News desktop cards: 33.33% columns with 16px gutters; tablet 50% columns; mobile one column.
- Middle banner pagination: 12px inactive marker, 40px active marker, 4 second progress transition.
- Technology active panel transition: `width 0.6s cubic-bezier(0.25, 1, 0.5, 1)`.

The retained `reference.css` is the complete source stylesheet and remains the authoritative token implementation.
