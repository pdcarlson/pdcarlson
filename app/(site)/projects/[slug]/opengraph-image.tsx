import { notFound } from "next/navigation";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getProject, projects } from "@/content/projects";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study card with the project's title, status, and summary.";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return renderOgImage({
    eyebrow: [project.status, project.year, project.madeAt ?? project.role].join(" · "),
    title: project.title,
    description: project.ogDescription,
  });
}
