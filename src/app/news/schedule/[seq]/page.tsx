import { PageChrome } from "@/components/content/main/PageChrome";
import { GenericArticleView } from "@/components/content/GenericArticleView";
import { getMediaEvent } from "@/lib/data/mediaRepository";

export async function generateMetadata({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  return { title: `${(await getMediaEvent(seq)).title} l navigators-c` };
}

export default async function MediaEventDetailPage({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const article = await getMediaEvent(seq);
  return (
    <PageChrome headerTheme="transparent">
      <GenericArticleView article={article} listHref="/news/schedule" />
    </PageChrome>
  );
}
