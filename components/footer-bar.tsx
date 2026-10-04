import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { site } from "@/content/site";

const links = [
  { label: "GitHub", href: site.github, external: true },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "Accessibility", href: "/accessibility", external: false },
];

export function FooterBar() {
  return (
    <footer className="no-print border-t border-rule px-[var(--gutter)] py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-caption text-fg-50">{site.name} · Troy, New York</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-caption">
        {links.map((link) => (
          <DrawUnderlineLink
            key={link.href}
            href={link.href}
            tone="muted"
            className="w-fit"
            external={link.external}
          >
            {link.label}
          </DrawUnderlineLink>
        ))}
      </div>
    </footer>
  );
}
