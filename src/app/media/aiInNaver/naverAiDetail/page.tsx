import { PageChrome } from "@/components/content/main/PageChrome";
import { GenericArticleView } from "@/components/content/GenericArticleView";
import { getAiArticle } from "@/lib/data/mediaRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  return { title: `${(await getAiArticle("service", seq)).article.title} l NOVA` };
}

export default async function AiArticlePage({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const { article, related } = await getAiArticle("service", seq);
  return (
    <PageChrome headerTheme="transparent">
      <GenericArticleView
        article={article}
        listHref="/media/aiInNaver"
        tagHrefBase="/media/aiInNaver?keyword="
        related={related.map((item) => ({ id: item.id, title: item.title, href: item.href, date: item.date, category: item.category }))}
      />
    </PageChrome>
  );
}
