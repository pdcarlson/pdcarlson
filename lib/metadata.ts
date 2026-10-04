import type { Metadata } from "next";
import { site } from "@/content/site";

// Pages are exported as <route>/index.html, so the trailing slash is the real URL.
export function canonicalUrl(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return new URL(trimmed ? `/${trimmed}/` : "/", site.url).toString();
}

export const sharedOpenGraph = {
  siteName: site.name,
  type: "website",
} as const;

// A page that sets its own openGraph replaces the layout's instead of merging
// with it, so every page builds the whole thing here.
export function routeMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
}: {
  path: string;
  title: Metadata["title"];
  description: string;
  ogTitle: string;
  ogDescription: string;
}): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...sharedOpenGraph, title: ogTitle, description: ogDescription, url },
  };
}
