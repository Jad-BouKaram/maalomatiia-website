"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import type { StatContent } from "@/types/landing";

const VISIBILITY_THRESHOLD = 0.5;

export default function StatCounter({ target, suffix, label }: StatContent) {
  const { ref, inView } = useInView(VISIBILITY_THRESHOLD);
  const value = useCountUp(target, inView);

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-bold tabular-nums text-white sm:text-6xl">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium tracking-wide text-white">
        {label}
      </p>
    </div>
  );
}
