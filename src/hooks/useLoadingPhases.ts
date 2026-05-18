"use client";

import { useEffect, useState } from "react";
import {
  ENTER_DURATION_MS,
  FADE_OUT_MS,
  INITIAL_ENTER_DELAY_MS,
  LOADING_TO_BURST_BUFFER_MS,
  POST_BURST_HOLD_MS,
  PRE_BURST_INHALE_MS,
  SETTLE_HOLD_MS,
} from "@/constants/loading";
import type { LoadingPhase } from "@/types/loading";

interface UseLoadingPhasesOptions {
  onComplete?: () => void;
  isLoadingTickComplete: boolean;
}

interface UseLoadingPhasesResult {
  phase: LoadingPhase;
  fadeOut: boolean;
}

export function useLoadingPhases({
  onComplete,
  isLoadingTickComplete,
}: UseLoadingPhasesOptions): UseLoadingPhasesResult {
  const [phase, setPhase] = useState<LoadingPhase>("idle");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const enterTimer = window.setTimeout(
      () => setPhase("enter"),
      INITIAL_ENTER_DELAY_MS
    );
    const loadingTimer = window.setTimeout(
      () => setPhase("loading"),
      INITIAL_ENTER_DELAY_MS + ENTER_DURATION_MS + SETTLE_HOLD_MS
    );
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading" || !isLoadingTickComplete) return;
    const timer = window.setTimeout(
      () => setPhase("preBurst"),
      LOADING_TO_BURST_BUFFER_MS
    );
    return () => clearTimeout(timer);
  }, [phase, isLoadingTickComplete]);

  useEffect(() => {
    if (phase !== "preBurst") return;
    const timer = window.setTimeout(
      () => setPhase("burst"),
      PRE_BURST_INHALE_MS
    );
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "burst") return;
    const fadeTimer = window.setTimeout(
      () => setFadeOut(true),
      POST_BURST_HOLD_MS
    );
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, POST_BURST_HOLD_MS + FADE_OUT_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [phase, onComplete]);

  return { phase, fadeOut };
}
