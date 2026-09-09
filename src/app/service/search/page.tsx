import { ServiceDetailAdapter } from "@/features/navercorp/components/service/ServiceDetailAdapter";
import { searchService } from "@/features/navercorp/data/services/search";

export const metadata = { title: "검색 l NAVER Corp.", description: "네이버 검색 서비스" };
export default function SearchServicePage() { return <ServiceDetailAdapter detail={searchService} />; }
