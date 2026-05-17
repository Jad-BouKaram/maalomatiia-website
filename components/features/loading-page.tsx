"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BURST_PARTICLE_COUNT = 18;
const STREAK_COUNT = 10;

const ENTER_DURATION_MS = 1100;
const SETTLE_HOLD_MS = 400;
const LOADING_DURATION_MS = 2200;
const PRE_BURST_INHALE_MS = 180;
const BURST_LIFETIME_MS = 1100;
const POST_BURST_HOLD_MS = 1150;
const FADE_OUT_MS = 600;

const LOGO_SRC = "/Maaloomatia_Logo.svg";

type BurstParticle = {
  tx: number;
  ty: number;
  size: number;
  delay: number;
  duration: number;
};

type Streak = {
  angle: number;
  height: number;
  delay: number;
};

const BURST_PARTICLES: BurstParticle[] = Array.from(
  { length: BURST_PARTICLE_COUNT },
  (_, i) => {
    const angle = (i / BURST_PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const dist = 90 + Math.random() * 150;
    return {
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 120,
      duration: 700 + Math.random() * 400,
    };
  }
);

const BURST_STREAKS: Streak[] = Array.from({ length: STREAK_COUNT }, (_, i) => ({
  angle: i * (360 / STREAK_COUNT) + Math.random() * 6,
  height: 70 + Math.random() * 80,
  delay: i * 12,
}));

interface LoadingScreenProps {
  onComplete?: () => void;
}

type Phase = "idle" | "enter" | "loading" | "preBurst" | "burst" | "done";

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [fadeOut, setFadeOut] = useState(false);

  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tEnter = window.setTimeout(() => setPhase("enter"), 60);
    const tLoad = window.setTimeout(
      () => setPhase("loading"),
      60 + ENTER_DURATION_MS + SETTLE_HOLD_MS
    );
    return () => {
      clearTimeout(tEnter);
      clearTimeout(tLoad);
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const start = performance.now();
    let raf = 0;
    let nextPhaseTimer = 0;

    function tick(now: number) {
      const t = Math.min((now - start) / LOADING_DURATION_MS, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const coreSize = 10 + eased * 30;
      const coreOpacity = eased * 0.85;
      const coreBlur = 20 + eased * 50;
      const coreShadowAlpha = eased * 0.7;

      const core = coreRef.current;
      if (core) {
        core.style.width = `${coreSize}px`;
        core.style.height = `${coreSize}px`;
        core.style.opacity = String(coreOpacity);
        core.style.boxShadow = `0 0 ${coreBlur}px rgba(0, 255, 232, ${coreShadowAlpha})`;
      }
      if (t > 0.6 && logoWrapRef.current) {
        const pulse = 1 + Math.sin(now / 130) * 0.035 * (t - 0.6) * 2.5;
        logoWrapRef.current.style.transform = `translate3d(0,0,0) scale(${pulse})`;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        nextPhaseTimer = window.setTimeout(() => setPhase("preBurst"), 120);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (nextPhaseTimer) clearTimeout(nextPhaseTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "preBurst") return;
    const t = window.setTimeout(() => setPhase("burst"), PRE_BURST_INHALE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "burst") return;

    const tFadeOut = window.setTimeout(() => setFadeOut(true), POST_BURST_HOLD_MS);
    const tDone = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, POST_BURST_HOLD_MS + FADE_OUT_MS);

    return () => {
      clearTimeout(tFadeOut);
      clearTimeout(tDone);
    };
  }, [phase, onComplete]);

  const entered = phase === "enter" || phase === "loading" || phase === "preBurst" || phase === "burst";
  const isPreBurst = phase === "preBurst";
  const isBurst = phase === "burst";

  return (
    <div
      className="ls-root fixed inset-0 flex items-center justify-center overflow-hidden bg-brand-dark-navy"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
        pointerEvents: fadeOut ? "none" : "auto",
        zIndex: 100,
      }}
    >
      <div className="relative z-10 flex items-center justify-center">
        <div ref={logoWrapRef} className="ls-logo-wrap relative flex items-center justify-center">
          <div
            ref={coreRef}
            className="ls-core absolute rounded-full"
            data-burst={isBurst ? "1" : "0"}
            aria-hidden
          />

          <div
            className="ls-logo relative"
            data-state={isBurst ? "burst" : isPreBurst ? "inhale" : entered ? "in" : "out"}
          >
            <Image
              src={LOGO_SRC}
              alt="Maaloomatiia"
              fill
              priority
              sizes="(max-width: 480px) 60vw, (max-width: 1024px) 40vw, 320px"
              style={{ objectFit: "contain" }}
            />
          </div>

          {isBurst && (
            <>
              <div className="ls-shockwave ls-shockwave-1" aria-hidden />
              <div className="ls-shockwave ls-shockwave-2" aria-hidden />
              <div className="ls-shockwave ls-shockwave-3" aria-hidden />
              <div className="ls-shockwave ls-shockwave-4" aria-hidden />

              {BURST_PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="ls-particle"
                  style={
                    {
                      width: p.size,
                      height: p.size,
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      animationDuration: `${p.duration}ms`,
                      animationDelay: `${p.delay}ms`,
                    } as React.CSSProperties
                  }
                  aria-hidden
                />
              ))}

              {BURST_STREAKS.map((s, i) => (
                <span
                  key={i}
                  className="ls-streak"
                  style={
                    {
                      height: s.height,
                      "--angle": `${s.angle}deg`,
                      animationDelay: `${s.delay}ms`,
                    } as React.CSSProperties
                  }
                  aria-hidden
                />
              ))}
            </>
          )}
        </div>
      </div>

      <style>{`
        .ls-logo-wrap {
          width: 320px;
          height: 240px;
          will-change: transform;
          transform: translateZ(0);
        }
        .ls-core {
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          transform: translate3d(-50%, -50%, 0);
          background: radial-gradient(circle, #00ffe8, #00d4c8 40%, transparent 70%);
          opacity: 0;
          z-index: 5;
          will-change: transform, opacity;
        }
        .ls-core[data-burst="1"] {
          animation: lsFlash 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes lsFlash {
          0%   { width: 0; height: 0; opacity: 0;
                 box-shadow: 0 0 0 rgba(0, 255, 232, 0); }
          18%  { width: 560px; height: 560px; opacity: 0.95;
                 box-shadow: 0 0 140px rgba(0, 255, 232, 1); }
          55%  { opacity: 0.5; }
          100% { width: 720px; height: 720px; opacity: 0;
                 box-shadow: 0 0 40px rgba(0, 255, 232, 0); }
        }

        .ls-logo {
          width: 100%;
          height: 100%;
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        .ls-logo[data-state="out"] {
          opacity: 0;
          transform: scale(0.2) rotate(-25deg) translateZ(0);
        }
        .ls-logo[data-state="in"] {
          opacity: 1;
          transform: scale(1) rotate(0deg) translateZ(0);
          transition:
            opacity 0.55s ease-out,
            transform ${ENTER_DURATION_MS}ms cubic-bezier(0.34, 1.45, 0.64, 1);
        }
        .ls-logo[data-state="inhale"] {
          opacity: 1;
          transform: scale(0.92) rotate(-2deg) translateZ(0);
          transition:
            transform ${PRE_BURST_INHALE_MS}ms cubic-bezier(0.5, 0, 0.75, 0);
        }
        .ls-logo[data-state="burst"] {
          animation: lsLogoBurst ${BURST_LIFETIME_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lsLogoBurst {
          0%   { opacity: 1; transform: scale(0.92) rotate(-2deg) translateZ(0); }
          22%  { opacity: 1; transform: scale(1.18) rotate(2deg) translateZ(0); }
          100% { opacity: 0; transform: scale(1.65) rotate(8deg) translateZ(0); }
        }

        .ls-shockwave {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transform: translate3d(-50%, -50%, 0) scale(0);
          will-change: transform, opacity;
          animation-name: lsShockwave;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }
        .ls-shockwave-1 {
          width: 360px; height: 360px;
          border: 2px solid rgba(0, 255, 232, 0.7);
          box-shadow: 0 0 30px rgba(0, 229, 212, 0.3);
          animation-duration: 900ms;
          animation-delay: 0ms;
        }
        .ls-shockwave-2 {
          width: 360px; height: 360px;
          border: 2px solid rgba(0, 229, 212, 0.45);
          animation-duration: 950ms;
          animation-delay: 140ms;
        }
        .ls-shockwave-3 {
          width: 360px; height: 360px;
          border: 1.5px solid rgba(0, 229, 212, 0.3);
          animation-duration: 1000ms;
          animation-delay: 280ms;
        }
        .ls-shockwave-4 {
          width: 360px; height: 360px;
          border: 1.5px solid rgba(0, 229, 212, 0.22);
          animation-duration: 1050ms;
          animation-delay: 420ms;
        }
        @keyframes lsShockwave {
          0%   { opacity: 0.85; transform: translate3d(-50%, -50%, 0) scale(0.15); }
          100% { opacity: 0;    transform: translate3d(-50%, -50%, 0) scale(2.6); }
        }

        .ls-particle {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          background: #00ffe8;
          box-shadow: 0 0 6px #00ffe8;
          will-change: transform, opacity;
          animation-name: lsParticle;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
        @keyframes lsParticle {
          0%   { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1); }
          70%  { opacity: 1; }
          100% { opacity: 0;
                 transform: translate3d(calc(-50% + var(--tx)), calc(-50% + var(--ty)), 0) scale(0.3); }
        }

        .ls-streak {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          background: linear-gradient(to top, rgba(0, 255, 232, 0.85), transparent);
          transform-origin: bottom center;
          will-change: transform, opacity;
          animation: lsStreak 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lsStreak {
          0%   { opacity: 0;   transform: translate(-50%, -100%) rotate(var(--angle)) scaleY(0); }
          18%  { opacity: 0.9; transform: translate(-50%, -100%) rotate(var(--angle)) scaleY(1); }
          100% { opacity: 0;   transform: translate(-50%, -100%) rotate(var(--angle)) scaleY(1); }
        }

        @media (max-width: 1024px) { .ls-logo-wrap { width: 260px; height: 200px; } }
        @media (max-width: 480px)  { .ls-logo-wrap { width: 200px; height: 160px; } }
        @media (max-width: 360px)  { .ls-logo-wrap { width: 170px; height: 140px; } }

        @media (prefers-reduced-motion: reduce) {
          .ls-logo, .ls-core, .ls-shockwave, .ls-particle, .ls-streak {
            animation-duration: 0.001s !important;
            transition-duration: 0.001s !important;
          }
        }
      `}</style>
    </div>
  );
}
