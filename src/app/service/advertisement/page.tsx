import { ServiceDetailAdapter } from "@/features/navercorp/components/service/ServiceDetailAdapter";
import { advertisementService } from "@/features/navercorp/data/services/advertisement";
export const metadata = { title: "광고 l NAVER Corp." };
export default function AdvertisementPage() { return <ServiceDetailAdapter detail={advertisementService} />; }
