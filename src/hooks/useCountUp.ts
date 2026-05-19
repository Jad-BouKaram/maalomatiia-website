"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 1800;
const FRAME_COUNT = 60;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useCountUp(target: number, active: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion()) {
      const settle = window.setTimeout(() => setValue(target), 0);
      return () => clearTimeout(settle);
    }

    const increment = target / FRAME_COUNT;
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, DURATION_MS / FRAME_COUNT);

    return () => clearInterval(timer);
  }, [target, active]);

  return value;
}
