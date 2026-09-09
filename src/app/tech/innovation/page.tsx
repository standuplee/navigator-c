import { ServiceOverview } from "@/features/navercorp/components/service/ServiceOverview";

export const metadata = { title: "우리의 활동 l NAVER Corp.", description: "네이버의 기술과 활동" };
export default function InnovationPage() { return <ServiceOverview initialTab="activity" />; }
