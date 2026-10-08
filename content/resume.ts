import type { ResumeSection } from "./types";

export const resume = {
  intro: "Cut to the chase if you must.",
  pdf: "/assets/Paul-Carlson-Resume.pdf",

  sections: [
    {
      heading: "Education",
      entries: [
        {
          title: "Rensselaer Polytechnic Institute",
          detail:
            "B.S. Computer Science and B.S. Information Technology and Web Science · Troy, NY",
          dates: "Aug 2024 - May 2028",
          bullets: [
            "GPA: 3.57",
            "Relevant coursework: Intro to Algorithms, Data Structures, Principles of Software, Web Science Systems Development, Foundations of Computer Science, Computer Architecture & Operating Systems",
          ],
        },
      ],
    },
    {
      heading: "Experience",
      entries: [
        {
          title: "East-SouthEast, LLC",
          detail: "Web & Geospatial Technology Intern · Chatham, MA",
          dates: "May 2025 - Dec 2025",
          bullets: [
            "Rebuilt East-SouthEast's web map from a separate copy of the code for each town into one config-driven app, then used it to expand the map from nine towns to all 15 on Cape Cod.",
            "Collected precise property and topographic survey data in the field using GPS receivers and total stations.",
            "Assisted with survey workflows by performing background data work and digitizing linework in Carlson Survey CAD software.",
            "Digitized over 100 sewer plans in QGIS to build a new interactive map from scratch.",
          ],
        },
      ],
    },
    {
      heading: "Projects",
      entries: [
        {
          title: "Frapp",
          detail: "NestJS, Next.js, Supabase, React Native (Expo), Stripe",
          href: "/projects/frapp",
          bullets: [
            "Architected a multi-tenant SaaS backend with JWT-scoped tenant isolation across three composed guards and row-level security on 50 database tables, validated by a 12-case cross-tenant isolation test suite.",
            "Built a 20-screen React Native mobile app wired to a 180+ endpoint REST API, reaching 90% test coverage.",
            "Designed an adversarial AI evaluation harness (43 tests) enforcing citation grounding and prompt-injection defenses ahead of any model implementation.",
            "Maintained 4,700+ passing tests across a codebase of about 300,000 lines, built solo over 6.5 months.",
          ],
        },
        {
          title: "Tau Nu Fiji Operations Platform",
          detail: "Next.js 14, TypeScript, Appwrite, Discord API, AWS",
          href: "/projects/tau-nu-fiji-ops-platform",
          bullets: [
            "Built a unified platform for my fraternity chapter that digitizes facility management and secures academic archives using S3 pre-signed URLs, replacing manual trackers with a centralized architecture.",
            "Developed a cron-based scheduler that assigns weekly tasks and escalates overdue items from private DMs to public channels, enforcing accountability without manual follow-up.",
            "Engineered an RBAC system synced with live Discord roles, letting admins manage assignments and penalties directly via native Slash Commands.",
          ],
        },
        {
          title: "Interactive GIS Map",
          detail: "East-SouthEast, LLC internship",
          href: "/projects/gis-map",
          bullets: [
            "Delivered a single, dynamic codebase with JavaScript and Mapbox that covers all 15 Cape Cod towns, replacing a legacy system where each of the original nine towns ran its own one-off code.",
            "Built a dynamic legend, multi-page PDF report generator, and address search/bookmarking tools used to produce client-facing reports.",
            "Built a high-performance, cost-effective tile loader for USGS maps, bypassing expensive third-party APIs.",
          ],
        },
      ],
    },
    {
      heading: "Technical skills",
      rows: [
        { label: "Languages", value: "TypeScript, JavaScript, Python, C++, SQL" },
        { label: "Frameworks", value: "Next.js, NestJS, React, React Native (Expo), Node.js" },
        { label: "Cloud & infrastructure", value: "AWS (S3), Supabase, Stripe, Appwrite" },
        { label: "Tools", value: "Git, GitHub Actions (CI/CD), Mapbox GL JS, QGIS" },
      ],
    },
    {
      heading: "Additional experience",
      entries: [
        {
          title: "Camps Newfound-Owatonna",
          detail: "Cabin Counselor",
          dates: "June - Aug 2026",
          bullets: [
            "Looked after up to 10 twelve-year-old campers with a co-counselor across two overnight sessions spanning 7 weeks, running the cabin's full daily schedule.",
            "Moved from swimming to Rocks and Ropes partway through the summer and was certified to belay and run the zip line, high ropes, and low ropes, coaching campers through fear-based challenges and de-escalating peer conflict.",
          ],
        },
      ],
    },
    {
      heading: "Leadership",
      entries: [
        {
          title: "Chapter President",
          detail: "Phi Gamma Delta, Tau Nu Chapter",
          dates: "Jan 2026 - Present",
          bullets: [
            "Direct an executive cabinet of 5 officers and 10+ committee chairs for the chapter, managing risk mitigation and relations with university administration and International Headquarters.",
          ],
        },
        {
          title: "Stewardship Chair",
          detail: "Phi Gamma Delta, Tau Nu Chapter",
          dates: "Aug 2026 - Present",
          bullets: [
            "Manage the chapter's food budget (about $10,000 a semester) and the weekly grocery runs for the house.",
          ],
        },
        {
          title: "VP of Chapter Scholarship",
          detail: "Phi Gamma Delta, Tau Nu Chapter",
          dates: "Jan - May 2026",
          bullets: [
            "Wrote the scholarship committee's plan, ran chapter study hours, and kept up the chapter's library of old exams and study guides.",
          ],
        },
        {
          title: "Eagle Scout",
          detail: "Boy Scouts of America",
          dates: "Nov 2023",
          bullets: [
            "Led a team to build and install three community benches, managing the project from initial design and fundraising to final installation.",
          ],
        },
      ],
    },
  ] satisfies ResumeSection[],

  metaDescription:
    "Web and geospatial engineering at East-SouthEast, CS and ITWS at RPI, and the TypeScript, NestJS, and React Native work behind the projects on this site.",
  ogDescription:
    "Education, experience, projects, and leadership. The PDF is there too, if you'd rather skim.",
};
