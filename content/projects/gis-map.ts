import type { Project } from "../types";

export const gisMap: Project = {
  slug: "gis-map",
  number: "02",
  kind: "Internship",
  title: "Interactive GIS Map",
  subtitle: "Web mapping application",
  status: "Live",
  timeline: "May 2025 — Dec 2025",
  stack: ["JavaScript", "Mapbox", "QGIS", "Python"],
  links: [{ label: "View Live Site", href: "https://eastsoutheast.com" }],
  why:
    "The legacy system at East-SouthEast took hours to push a single update out to 9 New England towns. Every infrastructure change meant a manual rebuild, and town residents waited days for accurate maps. The replacement had to be faster, accessible to non-technical staff, and built on something that would still work in five years.",
  how:
    "One JavaScript codebase serves all 9 towns, configured per-town for parcel data, sewer plans, and topographic layers. Mapbox handles rendering. I built a dynamic legend, a multi-page printing utility for plan-sized exports, and the underlying interactive map by digitizing 100+ sewer plans in QGIS. Instead of paying third-party APIs for USGS topographic data, I replaced it with a custom tile loader using tippecanoe to vectorize DEM tiles. Same map, no API bill.",
  screenshots: [{ src: "/assets/ese-map-viewer-thumbnail.png", alt: "Interactive GIS map viewer" }],
};
