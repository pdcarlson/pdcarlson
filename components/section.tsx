import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  eyebrow,
  heading,
  surface = "surface",
  children,
}: {
  eyebrow?: string;
  heading?: string;
  surface?: "bg" | "surface";
  children: ReactNode;
}) {
  return (
    <section className={cn("px-8 sm:px-16 lg:px-24 py-16", surface === "surface" ? "bg-surface" : "bg-bg")}>
      {(eyebrow || heading) && (
        <div className="mb-10">
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          {heading && <h2 className="font-display text-[40px] leading-[48px] text-fg">{heading}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}
