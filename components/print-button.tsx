"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-6 py-3 text-[12px] tracking-eyebrow uppercase border border-fg/10 text-fg hover:bg-surface transition-colors"
    >
      <Printer size={14} />
      <span>Save as PDF</span>
    </button>
  );
}
