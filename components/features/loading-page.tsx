"use client";

import { useState, useEffect, useRef } from "react";

const LETTERS = "Coming Soon...".split("");

const BG_PARTICLE_COUNT = 40;
const BURST_PARTICLE_COUNT = 20;
const STREAK_COUNT = 12;

const INITIAL_RING_SHADOW =
  "0 0 20px rgba(0, 229, 212, 0.15), inset 0 0 15px rgba(0, 229, 212, 0.08)";

type BgParticle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
};

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0); // 0=init, 1=rings enter, 2=loading, 3=burst
  const [leftIn, setLeftIn] = useState(false);
  const [rightIn, setRightIn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showAccent, setShowAccent] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [particlesFade, setParticlesFade] = useState(false);
  const [streaksFade, setStreaksFade] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: BURST_PARTICLE_COUNT }, (_, i) => {
      const angle = (i / BURST_PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 80 + Math.random() * 140;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 300,
        duration: 0.6 + Math.random() * 0.5,
      };
    })
  );
  const [streaks] = useState(() =>
    Array.from({ length: STREAK_COUNT }, (_, i) => ({
      angle: i * (360 / STREAK_COUNT),
      height: 60 + Math.random() * 80,
      delay: i * 15,
    }))
  );

  // Refs for elements animated directly (avoid per-frame React re-renders)
  const logoBoxRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const leftInnerRef = useRef<HTMLDivElement | null>(null);
  const rightInnerRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgParticlesRef = useRef<BgParticle[]>([]);
  const burstActiveRef = useRef(false);
  const burstTimeRef = useRef(0);
  const canvasStopRef = useRef(false);

  // Background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const arr: BgParticle[] = [];
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      arr.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    bgParticlesRef.current = arr;

    let raf = 0;
    function draw() {
      if (!ctx || canvasStopRef.current) return;
      ctx.clearRect(0, 0, W, H);

      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.6);
      g.addColorStop(0, "rgba(10, 58, 74, 0.15)");
      g.addColorStop(1, "rgba(6, 14, 20, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      if (burstActiveRef.current) {
        burstTimeRef.current += 0.02;
        const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 200 + burstTimeRef.current * 300);
        bg.addColorStop(0, `rgba(0, 229, 212, ${Math.max(0, 0.2 - burstTimeRef.current * 0.1)})`);
        bg.addColorStop(1, "rgba(0, 229, 212, 0)");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }

      const ps = bgParticlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
        const o = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 212, ${o})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Phase 1: Rings enter
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase(1);
      setLeftIn(true);
    }, 500);
    const t2 = setTimeout(() => setRightIn(true), 1000);
    const t3 = setTimeout(() => setPhase(2), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Phase 2: Loading — animate via refs (no React re-renders)
  useEffect(() => {
    if (phase !== 2) return;

    const duration = 3000;
    const start = performance.now();
    let raf = 0;
    let nextPhaseTimer = 0;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const coreSize = 10 + eased * 30;
      const coreOpacity = eased * 0.8;
      const coreBlur = 20 + eased * 40;
      const coreShadowAlpha = eased * 0.6;
      const ringShadow = `0 0 ${20 + eased * 30}px rgba(0, 229, 212, ${0.15 + eased * 0.3}), inset 0 0 ${15 + eased * 15}px rgba(0, 229, 212, ${0.08 + eased * 0.15})`;

      const core = coreRef.current;
      if (core) {
        core.style.width = `${coreSize}px`;
        core.style.height = `${coreSize}px`;
        core.style.opacity = String(coreOpacity);
        core.style.boxShadow = `0 0 ${coreBlur}px rgba(0, 255, 232, ${coreShadowAlpha})`;
      }
      if (leftInnerRef.current) leftInnerRef.current.style.boxShadow = ringShadow;
      if (rightInnerRef.current) rightInnerRef.current.style.boxShadow = ringShadow;

      if (t > 0.7 && logoBoxRef.current) {
        const pulseSpeed = 200 - (t - 0.7) * 500;
        const ps = 1 + Math.sin(now / pulseSpeed) * 0.04 * (t - 0.7) * 10;
        logoBoxRef.current.style.transform = `scale(${ps})`;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        nextPhaseTimer = window.setTimeout(() => setPhase(3), 300);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (nextPhaseTimer) clearTimeout(nextPhaseTimer);
    };
  }, [phase]);

  // Phase 3: Burst
  useEffect(() => {
    if (phase !== 3) return;
    burstActiveRef.current = true;
    if (logoBoxRef.current) logoBoxRef.current.style.transform = "scale(1)";

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setFlash(true), 0));
    timers.push(window.setTimeout(() => setFlash(false), 150));
    timers.push(window.setTimeout(() => setParticlesFade(true), 700));
    timers.push(window.setTimeout(() => setStreaksFade(true), 300));

    timers.push(
      window.setTimeout(() => {
        LETTERS.forEach((_, i) => {
          timers.push(window.setTimeout(() => setVisibleLetters((v) => v + 1), i * 60));
        });
      }, 200)
    );

    timers.push(window.setTimeout(() => setShowAccent(true), 1200));
    timers.push(window.setTimeout(() => setShowTagline(true), 1500));
    timers.push(window.setTimeout(() => setShowFloat(true), 2000));

    // Free the main thread once the burst has fully settled.
    timers.push(window.setTimeout(() => { canvasStopRef.current = true; }, 3500));

    return () => { timers.forEach((t) => clearTimeout(t)); };
  }, [phase]);

  const spinnersOn = phase === 2;
  const burst = phase === 3;
  const particlesVisible = phase === 3;
  const streaksVisible = phase === 3;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center" style={{ background: "#060e14" }}>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="ls-logo-wrap">
        <div
          ref={logoBoxRef}
          className="relative flex items-center justify-center"
          style={{ width: 260, height: 200 }}
        >
          {/* Energy core */}
          <div
            ref={coreRef}
            className="absolute rounded-full"
            style={{
              width: flash ? 600 : burst ? 0 : 10,
              height: flash ? 600 : burst ? 0 : 10,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, #00ffe8, #00d4c8 40%, transparent 70%)",
              opacity: flash ? 0.9 : burst ? 0 : 0,
              boxShadow: flash
                ? "0 0 120px rgba(0, 255, 232, 1)"
                : "0 0 20px rgba(0, 255, 232, 0)",
              transition: flash ? "all 0.15s ease-out" : burst ? "all 0.8s ease-out" : "none",
              zIndex: 5,
            }}
          />

          {/* Left ring */}
          <div
            className="absolute"
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              top: "50%",
              left: 32.5,
              zIndex: 1,
              opacity: burst ? 0 : leftIn ? 1 : 0,
              transform: burst
                ? "translateY(-50%) translateX(-250px) scale(0.3) rotate(-90deg)"
                : leftIn
                ? "translateY(-50%) translateX(0) scale(1)"
                : "translateY(-50%) translateX(-80px) scale(0.3)",
              transition: burst
                ? "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
                : "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              ref={leftInnerRef}
              className="w-full h-full rounded-full relative"
              style={{
                border: "18px solid #28b8aa",
                borderTopColor: "#3cd0c2",
                borderLeftColor: "#3cd0c2",
                borderBottomColor: "#1a9a8c",
                borderRightColor: "#1a9a8c",
                boxShadow: INITIAL_RING_SHADOW,
              }}
            >
              {spinnersOn && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid transparent",
                    borderTopColor: "rgba(0, 255, 232, 0.8)",
                    animation: "spinCW 1.2s linear infinite",
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      top: -2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 6,
                      height: 6,
                      background: "#00ffe8",
                      boxShadow: "0 0 10px #00ffe8, 0 0 20px #00ffe8",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right ring */}
          <div
            className="absolute"
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              top: "50%",
              left: 97.5,
              zIndex: 2,
              opacity: burst ? 0 : rightIn ? 1 : 0,
              transform: burst
                ? "translateY(-50%) translateX(250px) scale(0.3) rotate(90deg)"
                : rightIn
                ? "translateY(-50%) translateX(0) scale(1)"
                : "translateY(-50%) translateX(80px) scale(0.3)",
              transition: burst
                ? "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
                : "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              ref={rightInnerRef}
              className="w-full h-full rounded-full relative"
              style={{
                border: "18px solid #1a9688",
                borderTopColor: "#28b0a2",
                borderLeftColor: "#28b0a2",
                borderBottomColor: "#127a6e",
                borderRightColor: "#127a6e",
                boxShadow: INITIAL_RING_SHADOW,
              }}
            >
              {spinnersOn && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid transparent",
                    borderTopColor: "rgba(0, 255, 232, 0.8)",
                    animation: "spinCCW 1s linear infinite",
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      top: -2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 6,
                      height: 6,
                      background: "#00ffe8",
                      boxShadow: "0 0 10px #00ffe8, 0 0 20px #00ffe8",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Shockwaves */}
          {burst && (
            <>
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 400,
                  height: 400,
                  left: "50%",
                  top: "50%",
                  border: "2px solid rgba(0, 255, 232, 0.6)",
                  boxShadow: "0 0 40px rgba(0, 229, 212, 0.3), inset 0 0 40px rgba(0, 229, 212, 0.1)",
                  transform: "translate(-50%, -50%) scale(2.5)",
                  opacity: 0,
                  transition: "all 0.8s ease-out",
                  animation: "shockwavePulse 0.8s ease-out forwards",
                }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  left: "50%",
                  top: "50%",
                  border: "2px solid rgba(0, 229, 212, 0.3)",
                  transform: "translate(-50%, -50%) scale(2)",
                  opacity: 0,
                  animation: "shockwavePulse 0.7s ease-out 0.1s forwards",
                }}
              />
            </>
          )}

          {/* Burst particles */}
          {particlesVisible &&
            particles.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: "50%",
                  top: "50%",
                  background: "#00ffe8",
                  boxShadow: "0 0 6px #00ffe8",
                  opacity: particlesFade ? 0 : 1,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  transition: particlesFade
                    ? "opacity 0.5s ease"
                    : `all ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms`,
                }}
              />
            ))}

          {/* Light streaks */}
          {streaksVisible &&
            streaks.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: 2,
                  height: streaksFade ? 0 : s.height,
                  left: "50%",
                  top: "50%",
                  background: "linear-gradient(to top, rgba(0, 255, 232, 0.8), transparent)",
                  transformOrigin: "bottom center",
                  transform: `rotate(${s.angle}deg)`,
                  opacity: streaksFade ? 0 : 0.8,
                  transition: streaksFade
                    ? "all 0.6s ease-out"
                    : `all 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${s.delay}ms`,
                }}
              />
            ))}
        </div>
        </div>

        {/* Coming Soon */}
        <div
          className="ls-coming-box absolute pointer-events-none whitespace-nowrap"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            animation: showFloat ? "gentleFloat 4s ease-in-out infinite" : "none",
          }}
        >
          <div className="flex">
            {LETTERS.map((char, i) => (
              <span
                key={i}
                className="ls-letter font-bold uppercase inline-block"
                style={{
                  fontSize: 52,
                  letterSpacing: 6,
                  color: "transparent",
                  background: "linear-gradient(135deg, #3cd0c2, #00ffe8, #28b8aa, #00ffe8)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  opacity: i < visibleLetters ? 1 : 0,
                  transform: i < visibleLetters ? "scale(1)" : "scale(0)",
                  filter: i < visibleLetters ? "blur(0px)" : "blur(10px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  animation: i < visibleLetters ? "shimmer 4s ease infinite" : "none",
                  width: char === " " ? 20 : undefined,
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </div>

          {/* Accent line */}
          <div className="flex justify-center" style={{ marginTop: 10 }}>
            <div
              className={`ls-accent${showAccent ? " ls-accent-on" : ""}`}
              style={{
                width: showAccent ? 120 : 0,
                height: 2,
                background: "linear-gradient(90deg, transparent, #3cd0c2, #00ffe8, #3cd0c2, transparent)",
                transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="ls-tagline text-center font-light italic mt-6"
            style={{
              fontSize: 16,
              letterSpacing: 5,
              color: showTagline ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0)",
              transition: "all 0.8s ease",
            }}
          >
            Innovate. Enable. Elevate.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spinCW { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes shockwavePulse {
          0% { opacity: 0.7; transform: translate(-50%, -50%) scale(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }

        @media (max-width: 1024px) {
          .ls-logo-wrap { transform: scale(0.82); }
          .ls-letter { font-size: 40px !important; letter-spacing: 4px !important; }
          .ls-tagline { font-size: 14px !important; letter-spacing: 4px !important; }
          .ls-accent-on { width: 100px !important; }
          .ls-coming-box { left: calc(50% + 14px) !important; }
        }
        @media (max-width: 480px) {
          .ls-logo-wrap { transform: scale(0.62); }
          .ls-letter { font-size: 28px !important; letter-spacing: 3px !important; }
          .ls-tagline { font-size: 12px !important; letter-spacing: 3px !important; margin-top: 14px; }
          .ls-accent-on { width: 80px !important; }
          .ls-coming-box { left: calc(50% + 8px) !important; }
        }
        @media (max-width: 360px) {
          .ls-logo-wrap { transform: scale(0.52); }
          .ls-letter { font-size: 22px !important; letter-spacing: 2px !important; }
          .ls-tagline { font-size: 11px !important; letter-spacing: 2px !important; }
          .ls-coming-box { left: calc(50% + 6px) !important; }
        }
      `}</style>
    </div>
  );
}