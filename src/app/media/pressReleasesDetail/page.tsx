import { PressReleaseDetail } from "@/features/navercorp/components/detail/PressReleaseDetail";
import { getPressReleaseDetail } from "@/features/navercorp/data/pressReleases/details";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const article = getPressReleaseDetail(seq);
  return { title: `${article.title} | NAVER Corp.`, description: "NAVER Corp. 보도자료 상세" };
}

export default async function PressReleasesDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ seq?: string }>;
}) {
  const { seq } = await searchParams;
  return <PressReleaseDetail article={getPressReleaseDetail(seq)} />;
}
