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
  deepDive: [
    {
      heading: "The coordination problem",
      body:
        "Chapter operations today live across GroupMe, a billing portal, a separate dues spreadsheet, a shared Drive for documents, and whatever calendar people remember to look at. The chapter president is the index. Frapp's bet is that if one app owns members, money, events, and documents, the index goes away.",
    },
    {
      heading: "Why a monorepo",
      body:
        "Mobile, web admin, marketing, and the API all share a TypeScript types package and a Zod schema package. A change to a member field updates the API contract, the mobile form, and the admin table in one PR. Turborepo handles the dependency graph; I don't.",
    },
    {
      heading: "Spec-first as a forcing function",
      body:
        "Every feature starts as a spec doc. Product intent, the model changes, the API endpoints, and the screens. Code gets written against that spec. It slows the first hour and saves the next ten — and it's the single thing that's made working alongside AI tools actually productive.",
    },
  ],
};
