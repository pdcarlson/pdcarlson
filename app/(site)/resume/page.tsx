import { Code2, Layers, Terminal } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/print-button";
import { resume } from "@/content/resume";

export const metadata = { title: "Resume" };

const skillIcon = {
  Languages: Code2,
  Frameworks: Layers,
  Tools: Terminal,
} as const;

export default function ResumePage() {
  return (
    <>
      <PageHeader title="Resume" intro={resume.intro} action={<PrintButton />} />

      <section className="bg-surface px-8 sm:px-16 lg:px-24 py-16">
        <div className="eyebrow mb-4">Skills</div>
        <h2 className="font-display text-[40px] leading-[48px] text-fg mb-10">Technical Skills</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resume.skills.map((group) => {
            const Icon = skillIcon[group.label];
            return (
              <div key={group.label} className="bg-sidebar p-8">
                <Icon size={18} className="text-muted mb-8" strokeWidth={1.75} />
                <div className="eyebrow mb-4">{group.label}</div>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-display text-[20px] leading-[28px] text-fg">{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-bg px-8 sm:px-16 lg:px-24 py-16">
        <div className="eyebrow mb-10">Experience</div>
        {resume.experience.map((e) => (
          <div key={e.role + e.org} className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-16 mb-12 last:mb-0">
            <div className="eyebrow pt-1">{e.dates}</div>
            <div>
              <h3 className="font-display text-[28px] leading-[36px] text-fg">{e.role}</h3>
              <p className="mt-1 text-[12px] tracking-eyebrow uppercase text-subtle">{e.org}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-[24px] text-muted">
                    <span className="text-subtle pt-2 shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-surface px-8 sm:px-16 lg:px-24 py-16">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
          <div>
            <div className="eyebrow mb-4">Education</div>
            <h3 className="font-display text-[32px] leading-[40px] text-fg">{resume.education.school}</h3>
            <p className="mt-2 text-[12px] tracking-eyebrow uppercase text-subtle">GPA: {resume.education.gpa}</p>

            <h4 className="mt-10 font-display text-[24px] leading-[32px] text-fg">{resume.education.courseworkHeading}</h4>
            <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {resume.education.coursework.map((c) => (
                <div key={c.code} className="border-l border-fg/10 pl-4">
                  <div className="text-[16px] leading-[22px] text-fg">{c.name}</div>
                  <div className="mt-1 text-[12px] tracking-eyebrow uppercase text-subtle">{c.code}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-sidebar p-8 self-start">
            <div className="eyebrow mb-4">Leadership</div>
            <h3 className="font-display text-[32px] leading-[40px] text-fg mb-8">{resume.leadership.heading}</h3>
            <div className="flex flex-col gap-8">
              {resume.leadership.entries.map((entry) => (
                <div key={entry.role}>
                  <h4 className="font-display text-[20px] leading-[28px] text-fg">{entry.role}</h4>
                  <p className="mt-1 text-[12px] tracking-eyebrow uppercase text-subtle">{entry.org}</p>
                  <p className="mt-3 text-[14px] leading-[22px] text-muted">{entry.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
