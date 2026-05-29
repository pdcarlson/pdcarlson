import Image from "next/image";
import { ButtonLink } from "@/components/buttons";
import { FeaturedProject } from "@/components/featured-project";
import { GithubStrip } from "@/components/github-strip";
import { site } from "@/content/site";
import { getProject } from "@/content/projects";

export default function HomePage() {
  const featured = getProject(site.featuredProjectSlug);

  return (
    <>
      <section className="relative bg-surface overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-12 pl-8 pr-8 sm:pl-16 sm:pr-16 lg:pl-24 lg:pr-0 py-24 lg:py-0 lg:min-h-[960px]">
          <div className="lg:w-[526px] shrink-0">
            <h1 className="font-display text-[44px] leading-[52px] sm:text-[64px] sm:leading-[72px] lg:text-[80px] lg:leading-[88px] tracking-[-0.02em] text-fg">
              {site.hero.headlineLead}
              <br />
              <span className="font-light">{site.hero.headlineEmph}</span>
              <span>.</span>
            </h1>

            <p className="mt-8 text-[18px] leading-[28px] lg:text-[20px] lg:leading-[28px] text-subtle max-w-xl">
              {site.hero.intro}
            </p>

            <div className="mt-12 flex flex-wrap gap-6">
              <ButtonLink href="/projects" variant="primary">View Projects</ButtonLink>
              <ButtonLink href="/resume" variant="outline">View Resume</ButtonLink>
            </div>
          </div>

          <div className="relative w-full lg:w-[495px] aspect-[495/607] shrink-0 lg:ml-12">
            <Image
              src={site.headshot}
              alt="Paul Carlson"
              fill
              sizes="(min-width: 1024px) 495px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {featured && <FeaturedProject project={featured} />}
      <GithubStrip />
    </>
  );
}
