# Story components

- `StoryGrid` is an RCC because category tabs and keyword search update the visible collection.
- `StoryFilters` exposes seven category tabs (`All`, `Leader's View`, `Culture`, `Service`, `People`, `Tech`, `Impact`) and a search field with the placeholder `스토리 내 검색`.
- `StoryCard` is an RSC. It uses `next/image`, a typed `Story` prop, a detail link, and tag links that preserve the reusable `?keyword=` filter contract.
- Desktop layout uses three equal columns with 24px gaps; mobile collapses to one column. Cards have a 16:9 visual, 190px minimum content body, and tag pills.
- State A is `All` with an empty query. State B is a selected category or keyword query; filtering is case-insensitive and empty results render an explicit message.
