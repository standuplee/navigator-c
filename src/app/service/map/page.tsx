import { ServiceDetailAdapter } from "@/features/navercorp/components/service/ServiceDetailAdapter";
import { mapService } from "@/features/navercorp/data/services/map";
export const metadata = { title: "지도 l NAVER Corp." };
export default function MapPage() { return <ServiceDetailAdapter detail={mapService} />; }
