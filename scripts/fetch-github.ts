import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const USER = process.env.GITHUB_USER ?? "pdcarlson";
const OUT = resolve(process.cwd(), "lib/generated/github.json");
const TOKEN = process.env.GITHUB_TOKEN;

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

async function main() {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": `${USER}-portfolio-build`,
  };
  if (TOKEN) headers.authorization = `Bearer ${TOKEN}`;

  const url = `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.warn(`[fetch-github] ${res.status} ${res.statusText} — writing empty payload`);
    write({ repos: [], updatedAt: null });
    return;
  }

  const all = (await res.json()) as GhRepo[];
  const repos = all
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
    }));

  write({ repos, updatedAt: new Date().toISOString() });
  console.log(`[fetch-github] wrote ${repos.length} repos`);
}

function write(payload: unknown) {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
}

main().catch((err) => {
  console.warn("[fetch-github] failed:", err);
  write({ repos: [], updatedAt: null });
});
