import { SiteShell } from "@/components/layouts/SiteShell";
import { PressReleaseList } from "@/features/navercorp/components/media/PressReleaseList";
import { PressReleaseFeatured } from "@/features/navercorp/components/media/PressReleaseFeatured";
import { pressReleases } from "@/features/navercorp/data/pressReleases";
import { MobileNavigation } from "@/features/navercorp/components/main/main-c98712e4/MobileNavigation";
import { NavigationBehavior } from "@/features/navercorp/components/main/main-c98712e4/NavigationBehavior";
import { SiteFooter } from "@/features/navercorp/components/main/main-c98712e4/SiteFooter";
import { SiteHeader } from "@/features/navercorp/components/main/main-c98712e4/SiteHeader";

export const metadata = { title: "보도자료 l NAVER Corp.", description: "NAVER Corp. 보도자료" };
export default async function PressReleasesPage({ searchParams }: { searchParams: Promise<{ keyword?: string; page?: string }> }) {
  const params = await searchParams;
  const initialPage = Math.max(1, Number(params.page) || 1);
  return <SiteShell className="navercorp press-release-page" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}><NavigationBehavior /><main id="content"><div className="container"><header className="press-release-heading"><h1>보도자료</h1></header><PressReleaseFeatured items={pressReleases} /><PressReleaseList items={pressReleases} initialQuery={params.keyword ?? ""} initialPage={initialPage} /></div></main></SiteShell>;
}
