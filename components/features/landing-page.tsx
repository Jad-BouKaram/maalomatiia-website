"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BULLETS: string[] = [
  "Platform-aligned training & certification on your data, your use cases",
  "4,000+ learners trained across 14+ sectors",
  "150+ Data & AI practitioners delivering hands-on programs",
  "Backed by MAGNOOS & the Midis ecosystem",
];

const TAGLINE = "Innovate. Enable. Elevate.";
const DESCRIPTION =
  "Data & AI capability partner enabling enterprise teams across MENA to move from technology adoption to real delivery.";

const ENTER_DELAY_MS = 80;

export default function LandingPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), ENTER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className="lp-root relative w-full overflow-hidden bg-brand-dark-navy text-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
      }}
    >
      <BackgroundGlow />

      <div className="lp-container relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center">
        <header className="flex w-full flex-col items-center">
          <div className="lp-logo">
            <Image
              src="/Maaloomatiia_Logo_Full.svg"
              alt="Maaloomatiia"
              fill
              priority
              sizes="(max-width: 480px) 80vw, (max-width: 1024px) 60vw, 520px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="lp-tagline mt-2 text-center font-light italic uppercase text-white/55">
            {TAGLINE}
          </p>
        </header>

        <section className="mt-5 w-full max-w-2xl px-2 text-center md:mt-6">
          <p className="lp-description font-light leading-relaxed text-white/85">
            {DESCRIPTION}
          </p>
        </section>

        <section className="mt-5 w-full max-w-xl px-2 md:mt-6">
          <ul className="flex flex-col gap-2.5 md:gap-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <BulletDot />
                <p className="lp-bullet font-light leading-relaxed text-white/85">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <section className="mt-5 flex flex-col items-center md:mt-6">
          <h2 className="lp-coming bg-gradient-to-br from-brand-teal-light via-brand-accent-glow to-brand-teal bg-clip-text text-center font-bold uppercase tracking-[0.18em] text-transparent">
            Coming Soon...
          </h2>
          <p className="lp-stay mt-2 text-center font-light italic tracking-[0.18em] text-white/55">
            Our full website is on its way. Stay tuned.
          </p>
        </section>
      </div>

      <style>{`
        .lp-root {
          height: 100vh;
          height: 100dvh;
        }
        .lp-container {
          max-width: 64rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .lp-logo {
          position: relative;
          width: min(78vw, 460px);
          aspect-ratio: 520 / 150;
        }
        .lp-tagline {
          font-size: 11px;
          letter-spacing: 0.4em;
        }
        .lp-description { font-size: 15px; }
        .lp-bullet { font-size: 14px; }
        .lp-coming {
          font-size: clamp(28px, 6vw, 44px);
          letter-spacing: 0.18em;
        }
        .lp-stay { font-size: 13px; }

        @media (min-width: 640px) {
          .lp-tagline { font-size: 12px; }
          .lp-description { font-size: 16px; }
          .lp-bullet { font-size: 15px; }
          .lp-stay { font-size: 14px; }
        }
        @media (min-width: 768px) {
          .lp-container { padding-top: 1.5rem; padding-bottom: 1.5rem; }
          .lp-logo { width: min(60vw, 500px); }
          .lp-description { font-size: 17px; }
          .lp-bullet { font-size: 16px; }
        }
        @media (min-width: 1024px) {
          .lp-logo { width: min(45vw, 520px); }
          .lp-description { font-size: 18px; }
          .lp-bullet { font-size: 16px; }
        }
        @media (max-width: 480px) {
          .lp-container { padding-top: 0.5rem; padding-bottom: 0.5rem; }
          .lp-description { font-size: 13px; }
          .lp-bullet { font-size: 13px; line-height: 1.5; }
          .lp-tagline { font-size: 10px; letter-spacing: 0.32em; }
          .lp-stay { font-size: 11px; letter-spacing: 0.14em; }
        }
        @media (max-width: 360px) {
          .lp-description { font-size: 12px; }
          .lp-bullet { font-size: 12px; }
        }
        @media (max-height: 700px) {
          .lp-container { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        }
      `}</style>
    </main>
  );
}

function BulletDot() {
  return (
    <span
      className="mt-[7px] inline-block h-2 w-2 flex-none rounded-full bg-brand-accent-glow"
      style={{ boxShadow: "0 0 8px rgba(0, 255, 232, 0.7)" }}
      aria-hidden
    />
  );
}

function Divider() {
  return (
    <div
      className="mt-5 h-px w-full max-w-md md:mt-6"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(60, 208, 194, 0.55), transparent)",
      }}
      aria-hidden
    />
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div
        className="absolute left-1/2 top-[-15%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(40, 184, 170, 0.18), rgba(6, 14, 20, 0) 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(18, 122, 110, 0.15), rgba(6, 14, 20, 0) 60%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
