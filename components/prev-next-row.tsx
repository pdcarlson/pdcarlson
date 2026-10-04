import { DrawUnderlineLink } from "@/components/draw-underline-link";
import type { Project } from "@/content/types";

export function PrevNextRow({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  if (!previous && !next) return null;

  return (
    <nav className="flex flex-col gap-4 border-t border-rule pt-8 text-nav-link lg:flex-row lg:items-center lg:justify-between">
      {previous ? (
        <DrawUnderlineLink href={`/projects/${previous.slug}`} className="w-fit">
          Previous: {previous.title}
        </DrawUnderlineLink>
      ) : (
        <span />
      )}

      {next ? (
        <DrawUnderlineLink href={`/projects/${next.slug}`} className="w-fit">
          Next: {next.title}
        </DrawUnderlineLink>
      ) : (
        <span />
      )}
    </nav>
  );
}
