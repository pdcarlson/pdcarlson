export type ProjectStatus = "Development" | "Live" | "Archived" | "Concept";

export type Project = {
  slug: string;
  number: string;
  kind: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  timeline: string;
  stack: string[];
  links?: { label: string; href: string }[];
  why: string;
  how: string;
  deepDive?: { heading: string; body: string }[];
  screenshots?: { src: string; alt: string }[];
};

export type SkillGroup = {
  label: "Languages" | "Frameworks" | "Tools";
  items: string[];
};

export type ExperienceEntry = {
  dates: string;
  role: string;
  org: string;
  bullets: string[];
};

export type CourseRow = { name: string; code: string };

export type LeadershipEntry = {
  role: string;
  org: string;
  body: string;
};
