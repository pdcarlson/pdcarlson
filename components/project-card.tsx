"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  function openDrawer() {
    router.push(`/projects?project=${project.slug}`, { scroll: false });
  }

  return (
    <article className="bg-surface px-8 sm:px-16 lg:px-24 py-16 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
      <div>
        <div className="text-[14px] tracking-eyebrow uppercase text-muted mb-4">
          {project.number} / {project.kind}
        </div>
        <h3 className="font-display text-[44px] leading-[52px] text-fg">{project.title}</h3>
        <p className="mt-2 text-[14px] tracking-eyebrow uppercase text-subtle">{project.subtitle}</p>

        <div className="hairline mt-8" />

        <dl className="mt-8 flex flex-col gap-6">
          <div>
            <dt className="eyebrow mb-1">Status</dt>
            <dd className="font-display text-[20px] leading-[28px] text-fg">{project.status}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Timeline</dt>
            <dd className="font-display text-[20px] leading-[28px] text-fg">{project.timeline}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Stack</dt>
            <dd className="font-display text-[20px] leading-[28px] text-fg">{project.stack.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3">
          {project.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[14px] tracking-eyebrow uppercase text-fg border-b border-fg/10 hover:border-accent-strong w-fit pb-1"
            >
              <span>{l.label}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex items-center gap-2 text-[14px] tracking-eyebrow uppercase text-accent-strong border-b border-accent-strong w-fit pb-1 hover:gap-3 transition-all"
          >
            <span>Read deep dive</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <div className="bg-bg p-10 lg:p-12 flex flex-col gap-10">
        <div>
          <div className="eyebrow mb-4">Why</div>
          <p className="text-[16px] leading-[26px] text-muted">{project.why}</p>
        </div>
        <div>
          <div className="eyebrow mb-4">How</div>
          <p className="text-[16px] leading-[26px] text-muted whitespace-pre-line">{project.how}</p>
        </div>
      </div>
    </article>
  );
}
