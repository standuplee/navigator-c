import { SiteShell } from "@/components/layouts/SiteShell";
import { ServiceDetailPage } from "@/components/content/ServiceDetailPage";
import type { ServiceDetail } from "@/types/service";
import { MobileNavigation } from "../main/main-c98712e4/MobileNavigation";
import { NavigationBehavior } from "../main/main-c98712e4/NavigationBehavior";
import { SiteFooter } from "../main/main-c98712e4/SiteFooter";
import { SiteHeader } from "../main/main-c98712e4/SiteHeader";

export function ServiceDetailAdapter({ detail }: { detail: ServiceDetail }) {
  return <SiteShell className="navercorp service-detail-shell" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}><NavigationBehavior /><ServiceDetailPage detail={detail} /></SiteShell>;
}
