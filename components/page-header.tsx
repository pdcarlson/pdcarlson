import type { ReactNode } from "react";

export function PageHeader({ title, intro, action }: { title: string; intro?: string; action?: ReactNode }) {
  return (
    <header className="px-[var(--gutter)] pt-24 pb-16">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-3xl">
          <h1 className="font-display text-section-head text-fg tracking-[-0.02em]">{title}</h1>
          {intro ? <p className="mt-6 text-case-open text-fg-85 max-w-2xl">{intro}</p> : null}
        </div>
        {action ? <div className="pt-2 no-print">{action}</div> : null}
      </div>
    </header>
  );
}
