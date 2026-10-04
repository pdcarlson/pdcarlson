import { frapp } from "./frapp";
import { gisMap } from "./gis-map";
import { tauNuFijiOpsPlatform } from "./tau-nu-fiji-ops-platform";
import type { Project } from "../types";

export const projects: Project[] = [gisMap, frapp, tauNuFijiOpsPlatform];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
