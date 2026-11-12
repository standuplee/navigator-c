import type { AboutChapter, AboutStoryContent } from "@/types/pageTemplates";
import { AboutHero } from "./AboutHero";
import { AboutInfo } from "./AboutInfo";
import { CardGroups } from "./CardGroups";
import { CopyTitle } from "./CopyTitle";
import { EndingStatement } from "./EndingStatement";
import { HighlightStatement } from "./HighlightStatement";
import { LineupPanels } from "./LineupPanels";
import { TimelineCards } from "./TimelineCards";

function Chapter({ chapter }: { chapter: AboutChapter }) {
  const titleId = `${chapter.id}-title`;
  const label = `${chapter.copy.lead} ${chapter.copy.highlight} ${chapter.copy.tail}`;
  return (
    <section id={chapter.id} aria-labelledby={titleId} className="pb-24 pt-2 xl:pb-[120px]">
      <CopyTitle copy={chapter.copy} id={titleId} />
      <div className="mt-16 xl:mt-[150px]">
        {chapter.kind === "timeline" && <TimelineCards cards={chapter.cards} label={label} />}
        {chapter.kind === "lineup" && <LineupPanels panels={chapter.panels} />}
        {chapter.kind === "groups" && <CardGroups groups={chapter.groups} />}
      </div>
    </section>
  );
}

/** /company/about scroll story (PRD §7.5). Dark page; every block reads its content from
 * `AboutStoryContent` so the whole sequence can be edited from the admin. */
export function AboutStoryPage({ content }: { content: AboutStoryContent }) {
  return (
    <main className="bg-ink-dark-bg text-white">
      <AboutHero {...content.hero} nextId="about-intro" />
      <HighlightStatement id="about-intro" lead={content.intro.lead} statement={content.intro.statement} />
      {content.chapters.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}
      <EndingStatement ending={content.ending} />
      <AboutInfo info={content.info} />
    </main>
  );
}
