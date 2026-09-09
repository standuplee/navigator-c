import { ServiceOverview } from "@/features/navercorp/components/service/ServiceOverview";

export const metadata = {
  title: "우리의 사역 l NAVER Corp.",
  description: "네이버의 주요 서비스와 On-Service AI",
};

export default function FeaturedServicesPage() {
  return <ServiceOverview />;
}
