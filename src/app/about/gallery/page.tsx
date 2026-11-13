import { PageChrome } from "@/components/content/main/PageChrome";
import { ResourcePage } from "@/components/content/company/ResourcePage";
import { getBrandResourcesTabs, getGallery } from "@/lib/data/companyRepository";

export const metadata = { title: "갤러리 l navigators-c" };

export default async function GalleryRoute() {
  const [content, tabs] = await Promise.all([getGallery(), getBrandResourcesTabs()]);
  return (
    <PageChrome title={content.title} tabs={tabs}>
      <ResourcePage content={content} />
    </PageChrome>
  );
}
