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
  deepDive: [
    {
      heading: "Replacing the API bill with a build step",
      body:
        "USGS topographic data is free as source files, expensive as an API. I downloaded the DEM tiles for the region, ran them through tippecanoe to produce Mapbox vector tiles, and hosted the result on S3 behind CloudFront. The map looks identical. The recurring cost dropped to pennies a month.",
    },
    {
      heading: "One codebase, nine towns",
      body:
        "Each town gets its own config file declaring which layers to show, which sewer plans to load, and which contact info to surface. Adding a tenth town is editing a JSON file and pushing — no per-town deployment.",
    },
    {
      heading: "Print at engineering scale",
      body:
        "Field engineers print plan-sized PDFs from this thing. I wrote a multi-page export utility that tiles the current map view at print resolution and stitches the pages with consistent overlap. The first version was a single huge PNG and the browser ran out of memory.",
    },
  ],
  screenshots: [{ src: "/assets/ese-map-viewer-thumbnail.png", alt: "Interactive GIS map viewer" }],
};
