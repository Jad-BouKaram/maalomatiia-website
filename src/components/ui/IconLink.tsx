import type { ReactNode } from "react";

interface IconLinkProps {
  href: string;
  ariaLabel: string;
  external?: boolean;
  children: ReactNode;
}

const BASE =
  "flex h-11 w-11 flex-none items-center justify-center rounded-full border border-brand-teal/15 bg-brand-teal/10 text-brand-teal-light transition-colors hover:bg-brand-teal/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow";

export default function IconLink({
  href,
  ariaLabel,
  external,
  children,
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={BASE}
    >
      {children}
    </a>
  );
}
