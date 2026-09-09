import { SiteShell } from "@/components/layouts/SiteShell";
import { MobileNavigation } from "@/features/navercorp/components/main/main-c98712e4/MobileNavigation";
import { NavigationBehavior } from "@/features/navercorp/components/main/main-c98712e4/NavigationBehavior";
import { SiteFooter } from "@/features/navercorp/components/main/main-c98712e4/SiteFooter";
import { SiteHeader } from "@/features/navercorp/components/main/main-c98712e4/SiteHeader";
import { StoryGrid } from "@/features/navercorp/components/story/StoryGrid";
import { listStories } from "@/lib/content/story-repository";

export const metadata = { title: "네이버 스토리 l NAVER Corp.", description: "NAVER의 서비스와 기술 이야기를 소개합니다." };
export default async function StoryPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
  const { keyword = "" } = await searchParams;
  const stories = await listStories();
  return <SiteShell className="navercorp story-page" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}><NavigationBehavior /><main id="content"><div className="container"><header className="story-heading"><h1>네이버 스토리</h1></header><StoryGrid stories={stories} initialQuery={keyword} /></div></main></SiteShell>;
}
