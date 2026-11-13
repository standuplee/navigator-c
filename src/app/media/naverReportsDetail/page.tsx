import { PageChrome } from "@/components/content/main/PageChrome";
import { ReportDetailView } from "@/components/content/ReportDetailView";
import { getNaverReport, getNaverReportsList } from "@/lib/data/mediaRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const report = await getNaverReport(seq);
  return { title: `${report.title} l navigators-c` };
}

export default async function NaverReportDetailPage({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const [report, list] = await Promise.all([getNaverReport(seq), getNaverReportsList()]);
  const related = list
    .filter((item) => item.title !== report.title)
    .slice(0, 5)
    .map((item) => ({ id: item.id, title: item.title, href: item.href, date: item.date, category: item.category }));
  return (
    <PageChrome headerTheme="transparent">
      <ReportDetailView report={report} related={related} />
    </PageChrome>
  );
}
