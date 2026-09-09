import { SiteHeader } from "@/features/navercorp/components/main/main-c98712e4/SiteHeader";
import { MobileNavigation } from "@/features/navercorp/components/main/main-c98712e4/MobileNavigation";
import { HeroSection } from "@/features/navercorp/components/main/main-c98712e4/HeroSection";
import { NewsSection } from "@/features/navercorp/components/main/main-c98712e4/NewsSection";
import { PromotionSection } from "@/features/navercorp/components/main/main-c98712e4/PromotionSection";
import { TechnologySection } from "@/features/navercorp/components/main/main-c98712e4/TechnologySection";
import { PartnerSection } from "@/features/navercorp/components/main/main-c98712e4/PartnerSection";
import { SiteFooter } from "@/features/navercorp/components/main/main-c98712e4/SiteFooter";
import { MainBehavior } from "@/features/navercorp/components/main/main-c98712e4/MainBehavior";
import { NavigationBehavior } from "@/features/navercorp/components/main/main-c98712e4/NavigationBehavior";
export default function MainPage() {
 return <div className="navercorp main reference-runtime">
  <div className="skip"><a href="#content">Skip to content</a></div>
  <SiteHeader /><MobileNavigation />
  <main id="content"><div className="navercorp main"><div className="container">
   <HeroSection /><NewsSection /><PromotionSection /><TechnologySection /><PartnerSection />
  </div></div></main>
  <SiteFooter /><MainBehavior /><NavigationBehavior />
 </div>;
}
