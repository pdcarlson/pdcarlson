import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  href: string;
  external?: boolean;
};

export function OutlineButton({ href, external, className = "", ...rest }: Props) {
  const classes = `outline-btn ${className}`;

  if (external) {
    return <a href={href} target="_blank" rel="noreferrer" className={classes} {...rest} />;
  }

  return <Link href={href} className={classes} {...rest} />;
}
