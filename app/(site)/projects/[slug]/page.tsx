import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Figures } from "@/components/figures";
import { MarginSubheadBlock } from "@/components/margin-subhead-block";
import { MetaRow } from "@/components/meta-row";
import { PrevNextRow } from "@/components/prev-next-row";
import { RichText } from "@/components/rich-text";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { routeMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return routeMetadata({
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.metaDescription,
    ogTitle: `${project.title} · ${site.name}`,
    ogDescription: project.ogDescription,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const [cover, ...moreImages] = project.images;

  return (
    <div className="px-[var(--gutter)] pt-16 pb-24 lg:pt-20 lg:pb-32">
      <Figures images={[cover]} priority />

      <header className="mt-16 lg:mt-20">
        <h1 className="font-display text-case-title tracking-[-0.02em]">
          {project.title}
          <span aria-hidden="true" className="text-flare">
            .
          </span>
        </h1>
        <p className="mt-8 max-w-[660px] text-case-lede text-fg-85">{project.hook}</p>
      </header>

      <div className="mt-12 lg:mt-16">
        <MetaRow project={project} />
      </div>

      <article className="mt-16 flex flex-col gap-14 lg:mt-24 lg:gap-20">
        <MarginSubheadBlock>
          <Paragraphs items={project.intro} className="text-case-open text-fg-85" />
        </MarginSubheadBlock>

        {project.sections.map((section) => (
          <MarginSubheadBlock key={section.id} subhead={section.marginSubhead}>
            <Paragraphs items={section.paragraphs} className="text-case-body text-fg-75" />
          </MarginSubheadBlock>
        ))}
      </article>

      {moreImages.length > 0 ? (
        <div className="mt-16 lg:mt-24">
          <Figures images={moreImages} />
        </div>
      ) : null}

      {project.pullQuote ? (
        <blockquote className="mt-16 pl-6 font-display text-pull-quote italic text-sage lg:mt-24 lg:pl-[120px]">
          {project.pullQuote}
          <span className="text-flare">.</span>
        </blockquote>
      ) : null}

      <div className="mt-20 lg:mt-28">
        <PrevNextRow previous={projects[index - 1]} next={projects[index + 1]} />
      </div>
    </div>
  );
}

function Paragraphs({ items, className }: { items: string[]; className: string }) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {items.map((text) => (
        <p key={text}>
          <RichText text={text} />
        </p>
      ))}
    </div>
  );
}
