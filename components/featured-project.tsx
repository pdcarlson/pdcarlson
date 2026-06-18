"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="bg-bg px-8 sm:px-16 lg:px-24 py-20">
      <div className="eyebrow mb-4">Featured project</div>
      <Link
        href={`/projects?project=${project.slug}`}
        scroll={false}
        className="group block max-w-4xl"
      >
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-sans text-[14px] tracking-eyebrow uppercase text-muted">
            {project.number} / {project.kind}
          </span>
        </div>
        <h2 className="font-display text-[56px] leading-[64px] text-fg group-hover:text-accent-strong transition-colors">
          {project.title}
        </h2>
        <p className="mt-2 text-[14px] tracking-eyebrow uppercase text-subtle">{project.subtitle}</p>

        <p className="mt-8 text-[18px] leading-[28px] text-muted max-w-2xl">{project.why}</p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[12px] tracking-eyebrow uppercase text-subtle">
          <span>Status <span className="text-fg">{project.status}</span></span>
          <span>Timeline <span className="text-fg">{project.timeline}</span></span>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-[14px] tracking-eyebrow uppercase text-fg group-hover:gap-3 transition-all">
          <span>Read the full story</span>
          <ArrowRight size={16} />
        </div>
      </Link>
    </section>
  );
}
