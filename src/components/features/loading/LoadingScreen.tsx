"use client";

import Image from "next/image";
import { useState } from "react";
import BurstEffects from "@/components/features/loading/BurstEffects";
import {
  FADE_OUT_MS,
  LOADING_LOGO_ALT,
  LOADING_LOGO_SIZES,
  LOADING_LOGO_SRC,
} from "@/constants/loading";
import { useCoreAnimation } from "@/hooks/useCoreAnimation";
import { useLoadingPhases } from "@/hooks/useLoadingPhases";
import type { LoadingPhase } from "@/types/loading";

interface LoadingScreenProps {
  onComplete?: () => void;
}

function getLogoState(phase: LoadingPhase): string {
  if (phase === "burst") return "burst";
  if (phase === "preBurst") return "inhale";
  if (phase === "enter" || phase === "loading") return "in";
  return "out";
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isTickComplete, setIsTickComplete] = useState(false);

  const { phase, fadeOut } = useLoadingPhases({
    onComplete,
    isLoadingTickComplete: isTickComplete,
  });

  const { coreRef, logoWrapRef } = useCoreAnimation({
    active: phase === "loading",
    onComplete: () => setIsTickComplete(true),
  });

  const isBurst = phase === "burst";
  const logoState = getLogoState(phase);
  const canSkip = phase !== "burst" && phase !== "done";

  function handleSkip() {
    onComplete?.();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-brand-dark-navy"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="relative z-10 flex items-center justify-center">
        <div
          ref={logoWrapRef}
          className="ls-logo-wrap relative flex items-center justify-center"
        >
          <div
            ref={coreRef}
            className="ls-core absolute rounded-full"
            data-burst={isBurst ? "1" : "0"}
            aria-hidden
          />
          <div className="ls-logo relative" data-state={logoState}>
            <Image
              src={LOADING_LOGO_SRC}
              alt={LOADING_LOGO_ALT}
              fill
              priority
              sizes={LOADING_LOGO_SIZES}
              className="object-contain"
              unoptimized
            />
          </div>
          {isBurst && <BurstEffects />}
        </div>
      </div>

      {canSkip ? (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-8 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center rounded-full px-5 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow"
        >
          Skip intro
        </button>
      ) : null}
    </div>
  );
}
