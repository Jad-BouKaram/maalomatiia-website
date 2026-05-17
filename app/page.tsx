"use client";

import { useState } from "react";
import LoadingScreen from "@/components/features/loading-page";
import LandingPage from "@/components/features/landing-page";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      <LandingPage />
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}
    </>
  );
}
