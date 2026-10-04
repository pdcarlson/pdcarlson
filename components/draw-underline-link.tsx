import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  href: string;
  tone?: "sage" | "muted";
  external?: boolean;
};

export function DrawUnderlineLink({
  href,
  tone,
  external,
  className = "",
  ...rest
}: Props) {
  const classes = `dul ${tone ? `dul-${tone}` : ""} ${className}`;

  if (external) {
    return <a href={href} target="_blank" rel="noreferrer" className={classes} {...rest} />;
  }

  return <Link href={href} className={classes} {...rest} />;
}
