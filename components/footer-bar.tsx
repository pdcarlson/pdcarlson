import Link from "next/link";
import { site } from "@/content/site";

export function FooterBar() {
  return (
    <footer className="no-print bg-bg px-6 sm:px-12 lg:px-24 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] tracking-eyebrow uppercase text-muted">
      <span>© {site.copyrightYear} {site.name}</span>
      <div className="flex items-center gap-8">
        <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">GitHub</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
        <Link href="/accessibility" className="hover:text-fg transition-colors">Accessibility</Link>
      </div>
    </footer>
  );
}
