import { PageChrome } from "@/components/content/main/PageChrome";
import { ContactPage } from "@/components/content/company/ContactPage";
import { getContact } from "@/lib/data/companyRepository";

export const metadata = { title: "Contact l navigators-c" };

export default async function CompanyContactPage() {
  const content = await getContact();
  return (
    <PageChrome title={content.title}>
      <ContactPage content={content} />
    </PageChrome>
  );
}
