import { PageHeader } from "@/components/page-header";
import { accessibility } from "@/content/accessibility";

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader title="Accessibility" intro={accessibility.intro} />

      <section className="bg-surface px-8 sm:px-16 lg:px-24 py-16">
        <div className="flex flex-col gap-6 max-w-3xl">
          {accessibility.sections.map((s) => (
            <div key={s.eyebrow} className="bg-bg p-8">
              <div className="eyebrow mb-4">{s.eyebrow}</div>
              <p className="text-[16px] leading-[26px] text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
