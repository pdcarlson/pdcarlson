import type { Project } from "../types";

export const frapp: Project = {
  slug: "frapp",
  number: "01",
  kind: "Personal",
  title: "Frapp",
  subtitle: "Greek life operations platform",
  status: "Development",
  timeline: "2025 — Present",
  stack: ["TypeScript", "NestJS", "Next.js", "Expo", "Supabase"],
  links: [{ label: "View Repository", href: "https://github.com/pdcarlson/frapp" }],
  why:
    "Greek organizations don't have a software problem. They have a coordination problem. The tools exist but they're spread across four or five services that don't talk to each other, and someone (usually the chapter president) ends up being the human glue. Frapp puts that stack in one app.",
  how:
    "Frapp runs on a Turborepo monorepo with a NestJS backend, a Next.js web admin, an Expo mobile app, and a separate Next.js marketing site. Postgres on Supabase, Stripe for billing, Expo Push for notifications. I write everything spec-first. Product, behavior, and architecture decisions go in spec/ before any code is changed.",
};
