import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NOVA",
  description: "기업 사이트 메인 페이지 UI/UX 패턴 템플릿",
  robots: { index: false, follow: false },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ko"><head>
    <link rel="stylesheet" href="/sites/navercorp-65983208/main-c98712e4/swiper.css" />
    <link rel="stylesheet" href="/sites/navercorp-65983208/main-c98712e4/reference.css" />
  </head><body>{children}</body></html>;
}
