"use client";

import type { MouseEvent, ReactNode } from "react";

interface ScrollLinkProps {
  targetId: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function ScrollLink({
  targetId,
  children,
  className,
  ariaLabel,
}: ScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    if (!target) return;
    // Scroll in-page without writing the hash to the URL. Omitting `behavior`
    // lets the CSS `scroll-behavior` (and its reduced-motion override) apply.
    event.preventDefault();
    target.scrollIntoView({ block: "start" });
  }

  return (
    <a
      href={`#${targetId}`}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
