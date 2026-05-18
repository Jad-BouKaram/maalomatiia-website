"use client";

import BackgroundGlow from "@/components/ui/BackgroundGlow";
import Divider from "@/components/ui/Divider";
import BulletList from "@/components/features/landing/BulletList";
import ComingSoon from "@/components/features/landing/ComingSoon";
import Description from "@/components/features/landing/Description";
import Hero from "@/components/features/landing/Hero";
import {
  ENTER_ANIMATION_DELAY_MS,
  ENTER_ANIMATION_DURATION_MS,
  ENTER_ANIMATION_OFFSET_PX,
} from "@/constants/motion";
import { useEnterTransition } from "@/hooks/useEnterTransition";

export default function LandingPage() {
  const visible = useEnterTransition(ENTER_ANIMATION_DELAY_MS);

  return (
    <main
      className="lp-root relative w-full overflow-hidden bg-brand-dark-navy text-white"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : `translateY(${ENTER_ANIMATION_OFFSET_PX}px)`,
        transition: `opacity ${ENTER_ANIMATION_DURATION_MS}ms ease-out, transform ${ENTER_ANIMATION_DURATION_MS}ms ease-out`,
      }}
    >
      <BackgroundGlow />
      <div className="lp-container relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center">
        <Hero />
        <Description />
        <BulletList />
        <Divider />
        <ComingSoon />
      </div>
    </main>
  );
}
