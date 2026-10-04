import type { ReactNode } from "react";
import { DrawUnderlineLink } from "@/components/draw-underline-link";

const inlineLink = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(inlineLink)) {
    const start = match.index;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <DrawUnderlineLink key={start} href={match[2]}>
        {match[1]}
      </DrawUnderlineLink>
    );
    cursor = start + match[0].length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}
