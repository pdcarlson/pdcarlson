import type { Project } from "@/content/types";

export function MetaRow({ project }: { project: Project }) {
  const rest = [project.year, project.role, project.madeAt ?? ""];

  return (
    <div className="text-index-meta">
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr_1.9fr_1.4fr] border-y border-rule py-[18px]">
        <div className="text-flare">{project.status}</div>
        {rest.map((value, i) => (
          <div key={i} className="border-l border-rule pl-[26px] text-fg-75">
            {value}
          </div>
        ))}
      </div>

      <div className="lg:hidden border-t border-rule">
        <MobileCell value={project.status} flare />
        <MobileCell value={project.year} />
        <MobileCell value={project.role} />
        {project.madeAt ? <MobileCell value={project.madeAt} /> : null}
      </div>
    </div>
  );
}

function MobileCell({ value, flare }: { value: string; flare?: boolean }) {
  return (
    <div
      className={`border-b border-rule py-[14px] ${flare ? "text-flare" : "text-fg-75"}`}
    >
      {value}
    </div>
  );
}
