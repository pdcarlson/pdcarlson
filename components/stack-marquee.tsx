import { resume } from "@/content/resume";

const items = resume.skills.flatMap((group) => group.items);

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${ariaHidden ? "marquee-dup" : ""}`}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item) => (
        <li key={item} className="font-display text-[28px] leading-[36px] text-fg whitespace-nowrap">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StackMarquee() {
  return (
    <section className="bg-sidebar py-16">
      <div className="eyebrow mb-8 px-8 sm:px-16 lg:px-24">Stack I reach for</div>
      <div className="marquee-viewport">
        <div className="marquee">
          <Track />
          <Track ariaHidden />
        </div>
      </div>
    </section>
  );
}
