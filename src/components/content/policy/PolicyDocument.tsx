"use client";

import type { PolicyVersion } from "@/types/pageTemplates";
import { ArticleChrome } from "../blocks/ArticleChrome";

/** /policy/privacyDetail (PRD §7.11): the shared article chrome (780px, 48px title, scroll
 * title bar + progress, 목록보기) around the policy blocks. Tables scroll horizontally on
 * small screens instead of squeezing their columns. */
export function PolicyDocument({ version }: { version: PolicyVersion }) {
  return (
    <ArticleChrome category="개인정보 처리방침" title={version.title} date={version.date} listHref="/privacy">
      <div className="flex flex-col gap-5 text-base leading-[1.8] text-zinc-800 xl:text-lg">
        {version.blocks.map((block, index) => {
          switch (block.type) {
            case "heading":
              return <h2 key={index} className="mt-8 text-xl font-bold text-ink first:mt-0 xl:text-2xl">{block.text}</h2>;
            case "paragraph":
              return <p key={index}>{block.text}</p>;
            case "list":
              return (
                <ul key={index} className="flex list-disc flex-col gap-1 pl-5">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              );
            case "table":
              return (
                <div key={index} className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0">
                  <table className="w-full min-w-[560px] border-collapse border-t border-ink text-left text-sm xl:text-base">
                    <thead>
                      <tr className="bg-zinc-50">
                        {block.columns.map((column) => (
                          <th key={column} scope="col" className="border-b border-zinc-200 px-4 py-3 font-semibold">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border-b border-zinc-200 px-4 py-3 align-top text-zinc-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
          }
        })}
      </div>
    </ArticleChrome>
  );
}
