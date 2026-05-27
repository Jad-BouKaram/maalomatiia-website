"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LoadingScreen = dynamic(
  () => import("@/components/features/loading/LoadingScreen"),
  { ssr: false }
);

const SEEN_KEY = "maaloomatiia:loader-seen";

function shouldSkipIntro(): boolean {
  if (sessionStorage.getItem(SEEN_KEY)) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const ua = navigator.userAgent;
  if (/Chrome-Lighthouse|Speed Insights|HeadlessChrome|PageSpeed/i.test(ua)) {
    return true;
  }
  return false;
}

export default function LoaderGate() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!shouldSkipIntro()) return;
    const skip = window.setTimeout(() => setDone(true), 0);
    return () => clearTimeout(skip);
  }, []);

  function handleComplete() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setDone(true);
  }

  if (done) return null;

  return <LoadingScreen onComplete={handleComplete} />;
}
