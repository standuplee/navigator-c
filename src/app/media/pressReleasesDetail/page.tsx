import { PageChrome } from "@/components/content/main/PageChrome";
import { PressReleaseDetailView } from "@/components/content/PressReleaseDetailView";
import { getPressRelease } from "@/lib/data/mediaRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const article = await getPressRelease(seq);
  return { title: `${article.title} l NOVA` };
}

export default async function PressReleasesDetailPage({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const article = await getPressRelease(seq);
  return (
    <PageChrome>
      <PressReleaseDetailView article={article} />
    </PageChrome>
  );
}
