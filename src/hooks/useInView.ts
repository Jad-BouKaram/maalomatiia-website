"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_THRESHOLD = 0.15;

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold: number = DEFAULT_THRESHOLD
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
