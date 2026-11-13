import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "navigators-c",
  description: "기업 사이트 메인 페이지 UI/UX 패턴 템플릿",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* Legacy reference stylesheet (fonts + base rules the templates still rely on). It is
            scraped CSS with selectors Next's CSS parser rejects (e.g. `li:before .en`), so it
            can't be imported/bundled and is served as-is from /public. Swiper's CSS comes from
            swiper/css in the Carousel block. Remove once the base rules move to globals.css. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/sites/navercorp-65983208/main-c98712e4/reference.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
