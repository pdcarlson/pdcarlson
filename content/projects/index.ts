import { frapp } from "./frapp";
import { gisMap } from "./gis-map";
import type { Project } from "../types";

export const projects: Project[] = [frapp, gisMap];

export function getProject(slug: string | null | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
