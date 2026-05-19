"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/features/loading/LoadingScreen";

const SEEN_KEY = "maaloomatiia:loader-seen";

export default function LoaderGate() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SEEN_KEY)) return;
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
