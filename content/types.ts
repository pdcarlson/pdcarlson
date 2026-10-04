export type ProjectSection = {
  id: string;
  marginSubhead: string;
  paragraphs: string[]; // may contain inline [label](url) links
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string; // also shown as the caption
};

export type Project = {
  slug: string;
  title: string;
  status: string;
  year: string;
  role: string;
  madeAt?: string;
  builtWith: string[];
  blurb: string;
  hook: string;
  intro: string[];
  images: ProjectImage[]; // the first one leads the page, the rest follow the writing
  sections: ProjectSection[];
  pullQuote?: string;
  metaDescription: string;
  ogDescription: string;
};

export type ResumeEntry = {
  title: string;
  detail?: string;
  dates?: string;
  href?: string;
  bullets: string[];
};

export type ResumeSection = {
  heading: string;
  entries?: ResumeEntry[];
  rows?: { label: string; value: string }[]; // short label and value pairs, used for skills
};
