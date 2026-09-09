import { ServiceDetailAdapter } from "@/features/navercorp/components/service/ServiceDetailAdapter";
import { commerceService } from "@/features/navercorp/data/services/commerce";
export const metadata = { title: "커머스 l NAVER Corp." };
export default function CommercePage() { return <ServiceDetailAdapter detail={commerceService} />; }
