import type { AboutCopy } from "@/types/pageTemplates";
import { Reveal } from "../blocks/Reveal";

/** Chapter title (reference `.common-copy`): 40 / 48 / 64px, keyword in the accent colour. */
export function CopyTitle({ copy, id }: { copy: AboutCopy; id: string }) {
  return (
    <Reveal className="mx-auto max-w-[1440px] px-gutter xl:px-[60px]">
      <h2 id={id} className="text-[40px] font-bold leading-tight text-white md:text-5xl xl:text-[64px]">
        {copy.lead} <em className="not-italic text-accent">{copy.highlight}</em>
        <br className="md:hidden" /> {copy.tail}
      </h2>
    </Reveal>
  );
}
