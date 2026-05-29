import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { ProjectDrawer } from "@/components/project-drawer";
import { projects } from "@/content/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Personal Projects" intro="A few things I've built and what I learned doing them." />
      <div className="flex flex-col">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <Suspense fallback={null}>
        <ProjectDrawer />
      </Suspense>
    </>
  );
}
