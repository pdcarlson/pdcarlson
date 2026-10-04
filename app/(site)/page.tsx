import type { Metadata } from "next";
import Image from "next/image";
import { ContactBlock } from "@/components/contact-block";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { WorkIndex } from "@/components/work-index";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata({
  path: "/",
  title: { absolute: site.name },
  description: home.metaDescription,
  ogTitle: site.name,
  ogDescription: home.ogDescription,
});

const section = "px-[var(--gutter)] py-20 lg:py-24";

export default function HomePage() {
  const { hero, about } = home;

  return (
    <>
      <section className="px-[var(--gutter)] pt-24 pb-28 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:pt-40 lg:pb-36">
        <div>
          <h1 className="font-display text-hero-display tracking-[-0.02em]">
            {hero.heading}
            <span className="text-flare">.</span>
          </h1>

          <p className="mt-10 max-w-[620px] text-case-open text-fg-85">{hero.support}</p>

          <p className="mt-8 text-nav-link">
            <DrawUnderlineLink href="#work">{hero.linkLabel}</DrawUnderlineLink>
          </p>

          <p className="mt-12 text-index-meta text-fg-60">{hero.status}</p>
        </div>

        <Image
          src="/assets/headshot.jpg"
          alt={hero.photoAlt}
          width={495}
          height={607}
          priority
          className="mt-14 h-auto w-[220px] border border-frame lg:mt-0 lg:w-[clamp(240px,22vw,340px)]"
        />
      </section>

      <section id="work" className={section}>
        <h2 className="mb-[18px] font-display text-section-head lg:mb-[30px]">Work</h2>
        <WorkIndex projects={projects} />
      </section>

      <section id="about" className={`${section} grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-0`}>
        <h2 className="font-display text-margin-subhead italic text-sage">{about.marginLabel}</h2>
        <div className="flex max-w-[660px] flex-col gap-6 text-body-lg text-fg-75">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>

      <section id="contact" className="px-[var(--gutter)] py-20 lg:py-28">
        <ContactBlock />
      </section>
    </>
  );
}
