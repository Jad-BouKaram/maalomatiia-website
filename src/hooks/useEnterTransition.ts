"use client";

import { useEffect, useState } from "react";

export function useEnterTransition(delayMs: number): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return visible;
}
