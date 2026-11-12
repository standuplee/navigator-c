import { PageChrome } from "@/components/content/main/PageChrome";
import { PressReleaseDetailView } from "@/components/content/PressReleaseDetailView";
import { getPressRelease } from "@/lib/data/mediaRepository";

export async function generateMetadata({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const article = await getPressRelease(seq);
  return { title: `${article.title} l NOVA` };
}

export default async function PressReleasesDetailPage({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const article = await getPressRelease(seq);
  return (
    <PageChrome headerTheme="transparent">
      <PressReleaseDetailView article={article} />
    </PageChrome>
  );
}
