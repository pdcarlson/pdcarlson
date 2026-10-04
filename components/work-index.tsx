import Link from "next/link";
import type { Project } from "@/content/types";

const columns = "lg:grid lg:grid-cols-[90px_1fr_230px_300px] lg:gap-x-6";

export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className={`${columns} hidden`}>
        <div className="eyebrow">Year</div>
        <div className="eyebrow">Project</div>
        <div className="eyebrow">Made at</div>
        <div className="eyebrow">Built with</div>
      </div>

      {projects.map((p) => (
        <WorkIndexRow key={p.slug} project={p} />
      ))}
    </div>
  );
}

function WorkIndexRow({ project }: { project: Project }) {
  return (
    <article className="border-t border-rule">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title}, ${project.year}`}
        className={`work-row ${columns} flex flex-col gap-2 py-[22px] lg:gap-0 lg:py-[28px]`}
      >
        <div className="text-index-meta text-fg-50">{project.year}</div>

        <div className="lg:pr-6">
          <h3 className="text-project-title font-display text-fg">
            <span className="dul dul-thick">{project.title}</span>
          </h3>
          <p className="mt-2 text-index-blurb text-fg-60">{project.blurb}</p>
        </div>

        {project.madeAt ? (
          <div className="text-index-meta text-fg-60">{project.madeAt}</div>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div className="text-index-meta text-sage">
          {project.builtWith.join(" · ")}
        </div>
      </Link>
    </article>
  );
}
