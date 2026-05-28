"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowUpRight } from "lucide-react";
import { getProject } from "@/content/projects";

export function ProjectDrawer() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("project");
  const project = getProject(slug);
  const open = Boolean(project);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    router.push("/projects", { scroll: false });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed top-0 right-0 z-40 h-screen w-full sm:max-w-xl lg:max-w-2xl bg-sidebar text-fg overflow-y-auto shadow-2xl outline-none"
        >
          {project && (
            <div className="px-8 sm:px-12 py-12">
              <div className="flex items-start justify-between gap-6 mb-10">
                <div>
                  <div className="text-[14px] tracking-eyebrow uppercase text-muted mb-2">
                    {project.number} / {project.kind}
                  </div>
                  <Dialog.Title className="font-display text-[40px] leading-[48px] text-fg">{project.title}</Dialog.Title>
                  <Dialog.Description className="mt-2 text-[14px] tracking-eyebrow uppercase text-subtle">
                    {project.subtitle}
                  </Dialog.Description>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="p-2 -m-2 text-muted hover:text-fg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div>
                  <div className="eyebrow mb-1">Status</div>
                  <div className="text-[15px] text-fg">{project.status}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Timeline</div>
                  <div className="text-[15px] text-fg">{project.timeline}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Stack</div>
                  <div className="text-[15px] text-fg">{project.stack.join(", ")}</div>
                </div>
              </div>

              {project.screenshots?.map((s) => (
                <div key={s.src} className="mb-10 bg-bg p-4">
                  <img src={s.src} alt={s.alt} className="block w-full h-auto" />
                </div>
              ))}

              <div className="flex flex-col gap-10">
                <div>
                  <div className="eyebrow mb-3">Why</div>
                  <p className="text-[16px] leading-[26px] text-muted">{project.why}</p>
                </div>
                <div>
                  <div className="eyebrow mb-3">How</div>
                  <p className="text-[16px] leading-[26px] text-muted whitespace-pre-line">{project.how}</p>
                </div>

                {project.deepDive?.map((d) => (
                  <div key={d.heading}>
                    <h3 className="font-display text-[24px] leading-[32px] text-fg mb-3">{d.heading}</h3>
                    <p className="text-[16px] leading-[26px] text-muted">{d.body}</p>
                  </div>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-12 pt-8 border-t border-fg/10 flex flex-col gap-3">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[14px] tracking-eyebrow uppercase text-fg hover:text-accent-strong transition-colors w-fit"
                    >
                      <span>{l.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
