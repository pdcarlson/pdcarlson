import type { ReactNode } from "react";

export function MarginSubheadBlock({
  subhead,
  children,
}: {
  subhead?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid lg:grid-cols-[280px_minmax(0,640px)] lg:gap-x-16">
      {subhead ? (
        <h2 className="mb-3 font-display text-margin-subhead italic text-sage lg:mb-0 lg:pt-[5px] lg:text-right">
          {subhead}
        </h2>
      ) : (
        <div className="hidden lg:block" />
      )}

      <div>{children}</div>
    </section>
  );
}
