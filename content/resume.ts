import type { SkillGroup, ExperienceEntry, CourseRow, LeadershipEntry } from "./types";

export const resume = {
  intro: "What I know, what I've worked on, and what I'm studying.",

  skills: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "C++ / Java"] },
    { label: "Frameworks", items: ["React.js", "Next.js", "Tailwind CSS", "Node / Express"] },
    { label: "Tools", items: ["Git / GitHub", "Docker", "Figma", "AWS / Vercel"] },
  ] satisfies SkillGroup[],

  experience: [
    {
      dates: "May 2025 — September 2025",
      role: "Web & Geospatial Technology Intern",
      org: "East-SouthEast LLC",
      bullets: [
        "Built a web mapping app for 9 New England towns from a legacy system, cutting deploy time per update from hours to minutes.",
        "Digitized 100+ sewer plans in QGIS to build the underlying interactive map from scratch.",
        "Worked in the field with GPS receivers and total stations, then back at the office on the data side in Carlson Survey CAD.",
      ],
    },
  ] satisfies ExperienceEntry[],

  education: {
    school: "Rensselaer Polytechnic Institute",
    gpa: "3.60 / 4.00",
    courseworkHeading: "Relevant Coursework",
    coursework: [
      { name: "Data Structures", code: "CSCI 1200" },
      { name: "Principles of Software", code: "CSCI 2600" },
      { name: "Intro to Algorithms", code: "CSCI 2300" },
      { name: "Web Science Systems", code: "ITWS 4500" },
      { name: "Foundations of Computer Science", code: "CSCI 2200" },
      { name: "Computer Architecture & Operating Systems", code: "CSCI 2800" },
    ] satisfies CourseRow[],
  },

  leadership: {
    heading: "Community",
    entries: [
      {
        role: "Chapter President",
        org: "Tau Nu Chapter of Phi Gamma Delta",
        body:
          "Running a 25-member chapter through a full operating year. Budget, recruitment, alumni, and most of the calls in between.",
      },
      {
        role: "Eagle Scout",
        org: "Scouts of America",
        body:
          "Earned in 2023. The project was three benches in a Riverbay neighborhood that I planned, fundraised $1,250 for, got town board approval on, and led a volunteer crew to build.",
      },
    ] satisfies LeadershipEntry[],
  },
};
