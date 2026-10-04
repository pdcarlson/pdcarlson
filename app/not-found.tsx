import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { OutlineButton } from "@/components/outline-button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <SiteShell>
      <div className="px-[var(--gutter)] py-32">
        <p className="eyebrow mb-6">404</p>
        <h1 className="max-w-2xl font-display text-case-title">This page doesn&apos;t exist.</h1>
        <p className="mt-6 max-w-xl text-case-lede text-fg-75">
          Gone, or never existed. I&apos;d fix it if I knew which.
        </p>
        <OutlineButton href="/" className="mt-12">
          Back to the homepage
        </OutlineButton>
      </div>
    </SiteShell>
  );
}
