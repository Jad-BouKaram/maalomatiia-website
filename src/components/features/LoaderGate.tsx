"use client";

import { useState } from "react";
import LoadingScreen from "@/components/features/loading/LoadingScreen";

export default function LoaderGate() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return <LoadingScreen onComplete={() => setDone(true)} />;
}
