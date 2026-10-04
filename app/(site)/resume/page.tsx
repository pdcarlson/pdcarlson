import type { Metadata } from "next";
import { BulletList } from "@/components/bullet-list";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { MarginSubheadBlock } from "@/components/margin-subhead-block";
import { OutlineButton } from "@/components/outline-button";
import { PageHeader } from "@/components/page-header";
import { resume } from "@/content/resume";
import { site } from "@/content/site";
import type { ResumeEntry } from "@/content/types";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata({
  path: "/resume",
  title: "Resume",
  description: resume.metaDescription,
  ogTitle: `Resume · ${site.name}`,
  ogDescription: resume.ogDescription,
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        title="Resume"
        intro={resume.intro}
        action={
          <OutlineButton href={resume.pdf} external download>
            Download PDF
          </OutlineButton>
        }
      />

      <div className="flex flex-col gap-14 px-[var(--gutter)] pb-24 lg:gap-20">
        {resume.sections.map((section) => (
          <MarginSubheadBlock key={section.heading} subhead={section.heading}>
            {section.entries ? (
              <div className="flex flex-col gap-10">
                {section.entries.map((entry) => (
                  <Entry key={entry.title} entry={entry} />
                ))}
              </div>
            ) : null}

            {section.rows ? (
              <dl className="flex flex-col gap-3 text-case-body">
                {section.rows.map((row) => (
                  <div key={row.label} className="sm:grid sm:grid-cols-[190px_1fr] sm:gap-4">
                    <dt>{row.label}</dt>
                    <dd className="text-fg-75">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </MarginSubheadBlock>
        ))}
      </div>
    </>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-project-title">
          {entry.href ? (
            <DrawUnderlineLink href={entry.href}>{entry.title}</DrawUnderlineLink>
          ) : (
            entry.title
          )}
        </h3>
        {entry.dates ? <p className="text-index-meta text-fg-60">{entry.dates}</p> : null}
      </div>

      {entry.detail ? <p className="mt-2 text-index-meta text-fg-60">{entry.detail}</p> : null}

      <div className="mt-4">
        <BulletList items={entry.bullets} />
      </div>
    </div>
  );
}
