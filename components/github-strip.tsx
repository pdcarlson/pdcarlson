import { ArrowUpRight } from "lucide-react";
import data from "@/lib/generated/github.json";

type Repo = { name: string; description: string; url: string; stars: number; language: string | null };

export function GithubStrip() {
  const repos = (data?.repos ?? []) as Repo[];
  if (repos.length === 0) return null;

  return (
    <section className="bg-bg px-8 sm:px-16 lg:px-24 py-20">
      <div className="eyebrow mb-4">Recent repositories</div>
      <h2 className="font-display text-[32px] leading-[40px] text-fg mb-10">From the public side of my GitHub.</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.slice(0, 6).map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="block bg-surface p-6 h-full transition-colors hover:bg-sidebar"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mark text-[18px] leading-[24px] text-fg">{r.name}</span>
                <ArrowUpRight size={16} className="text-muted" />
              </div>
              {r.description && (
                <p className="text-[14px] leading-[20px] text-muted line-clamp-3 mb-4">{r.description}</p>
              )}
              <div className="flex items-center gap-4 text-[12px] tracking-eyebrow uppercase text-subtle">
                {r.language && <span>{r.language}</span>}
                {r.stars > 0 && <span>{r.stars} ★</span>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
