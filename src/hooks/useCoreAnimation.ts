"use client";

import { useEffect, useRef } from "react";
import { LOADING_DURATION_MS } from "@/constants/loading";

const CORE_BASE_SIZE_PX = 10;
const CORE_GROWTH_PX = 30;
const CORE_MAX_OPACITY = 0.85;
const CORE_BASE_BLUR_PX = 20;
const CORE_BLUR_GROWTH_PX = 50;
const CORE_MAX_SHADOW_ALPHA = 0.7;
const PULSE_START_T = 0.6;
const PULSE_FREQUENCY = 130;
const PULSE_AMPLITUDE = 0.035;
const PULSE_GAIN = 2.5;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface UseCoreAnimationOptions {
  active: boolean;
  onComplete: () => void;
}

interface UseCoreAnimationResult {
  coreRef: React.RefObject<HTMLDivElement | null>;
  logoWrapRef: React.RefObject<HTMLDivElement | null>;
}

export function useCoreAnimation({
  active,
  onComplete,
}: UseCoreAnimationOptions): UseCoreAnimationResult {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    let rafId = 0;

    function tick(now: number) {
      const t = Math.min((now - start) / LOADING_DURATION_MS, 1);
      const eased = easeInOutCubic(t);

      const core = coreRef.current;
      if (core) {
        const size = CORE_BASE_SIZE_PX + eased * CORE_GROWTH_PX;
        core.style.width = `${size}px`;
        core.style.height = `${size}px`;
        core.style.opacity = String(eased * CORE_MAX_OPACITY);
        core.style.boxShadow = `0 0 ${
          CORE_BASE_BLUR_PX + eased * CORE_BLUR_GROWTH_PX
        }px rgba(0, 255, 232, ${eased * CORE_MAX_SHADOW_ALPHA})`;
      }

      const logoWrap = logoWrapRef.current;
      if (logoWrap && t > PULSE_START_T) {
        const pulse =
          1 +
          Math.sin(now / PULSE_FREQUENCY) *
            PULSE_AMPLITUDE *
            (t - PULSE_START_T) *
            PULSE_GAIN;
        logoWrap.style.transform = `translate3d(0,0,0) scale(${pulse})`;
      }

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        onCompleteRef.current();
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  return { coreRef, logoWrapRef };
}
