"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="no-print hidden lg:flex sticky top-0 h-screen w-[288px] shrink-0 flex-col bg-sidebar px-6 pt-12 pb-8">
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-mark font-extrabold text-[24px] leading-[32px] text-muted">{site.name}</h1>
            <p className="mt-1 text-[12px] leading-[16px] tracking-eyebrow uppercase text-subtle">{site.role}</p>
          </div>

          <nav className="flex flex-col gap-4 w-[240px]">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 pl-5 py-2 text-[14px] leading-[20px] tracking-eyebrow uppercase rounded-r transition-colors",
                    active
                      ? "border-l-4 border-accent-strong text-accent-strong font-bold"
                      : "text-muted hover:text-fg"
                  )}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="no-print lg:hidden sticky top-0 z-20 bg-sidebar px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex flex-col">
          <span className="font-mark font-extrabold text-[18px] leading-[22px] text-muted">{site.name}</span>
          <span className="text-[11px] tracking-eyebrow uppercase text-subtle">{site.role}</span>
        </Link>
        <nav className="flex items-center gap-4">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className={cn(
                  "p-2 rounded transition-colors",
                  active ? "text-accent-strong" : "text-muted hover:text-fg"
                )}
              >
                <Icon size={18} strokeWidth={1.75} />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
