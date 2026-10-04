import type { Metadata } from "next";
import { BulletList } from "@/components/bullet-list";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { PageHeader } from "@/components/page-header";
import { accessibility } from "@/content/accessibility";
import { site } from "@/content/site";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata({
  path: "/accessibility",
  title: "Accessibility",
  description: accessibility.metaDescription,
  ogTitle: `Accessibility · ${site.name}`,
  ogDescription: accessibility.ogDescription,
});

const subhead = "mt-12 mb-4 font-display text-margin-subhead italic text-sage";

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader title="Accessibility" />

      <section className="px-[var(--gutter)] pb-24">
        <div className="max-w-[660px]">
          <p className="text-case-open text-fg-85">
            {accessibility.body}
            <DrawUnderlineLink href={`mailto:${site.email}`} tone="sage">
              {site.email}
            </DrawUnderlineLink>
          </p>

          <h2 className={subhead}>What it does</h2>
          <BulletList items={accessibility.does} />

          <h2 className={subhead}>What it doesn&apos;t</h2>
          <BulletList items={accessibility.doesNot} />

          <p className="mt-12 text-caption text-fg-50">{accessibility.lastChecked}</p>
        </div>
      </section>
    </>
  );
}
