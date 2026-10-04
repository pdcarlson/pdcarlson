"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawUnderlineLink } from "@/components/draw-underline-link";
import { OutlineButton } from "@/components/outline-button";
import { navItems, resumeItem } from "@/lib/nav";
import { site } from "@/content/site";

const gutter = "px-[var(--gutter)]";

function normalize(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function Nav() {
  const pathname = normalize(usePathname());
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isHome) return;

    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [isHome, pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setMenuOpen(false);
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    dialogRef.current?.close();
    setMenuOpen(false);
  }, [pathname]);

  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
    setMenuOpen(false);
  }

  const wordmark = (
    <Link
      href="/"
      className="font-display italic font-semibold text-wordmark leading-none text-fg"
    >
      {site.name}
    </Link>
  );

  return (
    <header
      className={`no-print sticky top-0 z-[10000] h-[var(--nav-height)] bg-bg border-b border-rule ${gutter}`}
    >
      <div className="flex h-full items-center justify-between gap-8">
        {wordmark}

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-nav-link">
            {navItems.map((item) => (
              <li key={item.href}>
                <DrawUnderlineLink
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </DrawUnderlineLink>
              </li>
            ))}
          </ul>
          <OutlineButton
            href={resumeItem.href}
            aria-current={pathname === resumeItem.href ? "page" : undefined}
          >
            {resumeItem.label}
          </OutlineButton>
        </nav>

        <button
          type="button"
          className="nav-toggle lg:hidden -mr-[11px]"
          data-open={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={menuOpen ? closeMenu : openMenu}
        >
          <span />
          <span />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="nav-dialog lg:hidden"
        aria-label="Menu"
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu();
        }}
      >
        <div className={`flex h-full flex-col ${gutter}`}>
          <div className="flex h-[var(--nav-height)] shrink-0 items-center justify-between gap-8">
            {wordmark}
            <button
              type="button"
              className="nav-toggle -mr-[11px]"
              data-open="true"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <span />
              <span />
            </button>
          </div>

          <nav
            aria-label="Menu"
            className="flex flex-1 flex-col items-center justify-center gap-10"
          >
            <ul className="flex flex-col items-center gap-10 text-project-title">
              {navItems.map((item) => (
                <li key={item.href}>
                  <DrawUnderlineLink
                    href={item.href}
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </DrawUnderlineLink>
                </li>
              ))}
            </ul>
            <OutlineButton
              href={resumeItem.href}
              aria-current={pathname === resumeItem.href ? "page" : undefined}
              onClick={closeMenu}
            >
              {resumeItem.label}
            </OutlineButton>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
