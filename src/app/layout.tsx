import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NAVER Corp. — Reference",
  description: "NAVER 기업 사이트 메인 페이지 레퍼런스 구현",
  robots: { index: false, follow: false },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><head>
    <link rel="stylesheet" href="/sites/navercorp-65983208/main-c98712e4/swiper.css" />
    <link rel="stylesheet" href="/sites/navercorp-65983208/main-c98712e4/reference.css" />
  </head><body>{children}</body></html>;
}
