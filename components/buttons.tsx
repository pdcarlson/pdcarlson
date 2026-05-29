import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "inline-flex items-center justify-center px-10 py-4 text-[14px] leading-[20px] tracking-eyebrow uppercase transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  outline:
    "bg-bg border border-fg text-fg hover:bg-fg hover:text-on-accent shadow-[0_4px_2px_rgba(0,0,0,0.25)]",
};

export function ButtonLink({ href, variant = "primary", external, className, children, ...rest }: ButtonLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={clsx(base, variants[variant], className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}
