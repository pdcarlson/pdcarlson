import type { Project } from "../types";

export const gisMap: Project = {
  slug: "gis-map",
  title: "GIS map",
  status: "Live",
  year: "2025",
  role: "Web & geospatial intern",
  madeAt: "East-SouthEast, LLC",
  builtWith: ["Mapbox", "Pannellum", "GitHub Pages"],
  blurb:
    "A shared web map for zoning, wetlands, and septic records across nine towns.",
  hook:
    "Every one of the nine towns on this map used to run its own copy of the code behind it.",
  intro: [
    "I spent a summer as the web and geospatial intern at East-SouthEast, a land surveying and civil engineering firm, rebuilding the map their town clients use for zoning, wetlands, septic records, and conservation review. Nine towns across Massachusetts and Cape Cod run on it today, embedded straight into each town's existing site. It's still live, still theirs, and East-SouthEast's own staff has kept building on it since my internship ended.",
  ],
  images: [
    {
      src: "/assets/ese-map-viewer-thumbnail.png",
      width: 1672,
      height: 794,
      alt: "The GIS map open on a Cape Cod town, showing FEMA flood zones and parcel boundaries beside the tools panel and the town's layer list.",
    },
  ],
  sections: [
    {
      id: "why",
      marginSubhead: "Nine towns, nine codebases",
      paragraphs: [
        "Before I touched it, the map wasn't one product, it was nine. Each town had been set up separately over the years, and each one had picked up its own special cases, like a layer only that town used, a report format only that client asked for, a workaround for a data quirk specific to that county's records. None of it was shared. Adding a feature for one town meant deciding whether to also add it to eight other codebases, and usually the honest answer was \"not this week.\"",
        "I didn't inherit a bug. I inherited nine slightly different versions of the same idea, all drifting further apart every time someone touched one of them.",
      ],
    },
    {
      id: "decisions",
      marginSubhead: "What changed",
      paragraphs: [
        "The fix wasn't a new feature, it was taking the town-specific logic out of the code entirely. Every town now runs off the same shared codebase, and what makes each one different lives in a config file, which says which layers it has, what basemap it starts on, and what report presets it offers. Adding a town is writing a JSON file, not opening a new branch. That's the whole point of the rewrite, and it's also the part that's hardest to demo, because from the outside a config-driven map looks identical to nine separate ones. The difference only shows up in how long the next change takes.",
        "Tiles were a real cost decision. A third-party tile provider would have meant a recurring bill scaled to usage, and East-SouthEast's clients are towns, not exactly flush with SaaS budget. I built a loader that pulls tiles straight from USGS instead, culls anything outside the current viewport so it's not fetching data nobody's looking at, and turns itself off entirely below a certain zoom level where it wouldn't be useful anyway. It's slower to set up than dropping in an API key, but it costs nothing per town, which mattered more.",
        "The panorama viewer was the ugliest problem technically. Street-level and site photos needed to sit inside the map at the right coordinates, viewable as a full 360-degree image, and the panorama library I used loads its images through paths that run straight into CORS restrictions (a browser security rule that blocks a page from loading certain resources from a different domain than the one serving it) when you try to point it at externally hosted photos. I ended up routing it through an iframe to sidestep the restriction, then built the tooling on top to store a growing library of panoramas and translate their coordinates onto the right spot on the map. It works, but it's a workaround bolted onto a library that wasn't built for this, not a clean solution I'd point to with pride.",
        "The last real feature was report generation, meaning multi-page PDF exports with presets like \"Conservation\" or \"Test Hole,\" each with its own legend generated per page and its own layer selection. That one exists because the actual client need wasn't \"a map,\" it was \"something I can hand a town official or put in front of a planning board,\" and a browser tab doesn't do that.",
      ],
    },
    {
      id: "what-broke",
      marginSubhead: "What I'd still fix",
      paragraphs: [
        "The deployment setup is the thing I'd fix first. The map is embedded into each town's existing Squarespace site through a script tag that pulls code and data from GitHub Pages, which was the right call given I wasn't about to rebuild nine towns' entire websites. But GitHub Pages serves directly out of the repo, so I ended up running two parallel repos, one for production and one for development, and promoting anything to production meant manually find-and-replacing URLs across a merge. It works. It's also exactly the kind of manual step that will eventually get skipped by someone in a hurry, possibly me.",
        "I also left myself a real backlog I never got to, with a FEMA flood data layer, elevation models, a buffer and proximity tool, a basemap toggle. Those are still open issues in the repo, not complaints from anyone using it, just the list of what a longer internship would have covered.",
      ],
    },
  ],
  metaDescription:
    "A shared web map I rebuilt for nine Massachusetts towns, replacing nine separate one-off codebases with one config-driven app.",
  ogDescription:
    "Nine towns used to run nine different maps. Here's how I made it one.",
};
