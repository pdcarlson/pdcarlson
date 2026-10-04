import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { canonicalUrl } from "@/lib/metadata";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/resume",
    "/accessibility",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return routes.map((route) => ({ url: canonicalUrl(route) }));
}
