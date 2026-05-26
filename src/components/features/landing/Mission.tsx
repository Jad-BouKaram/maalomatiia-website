import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import {
  MISSION_IMAGE,
  MISSION_IMAGE_ALT,
  MISSION_TEXT,
  MISSION_TITLE,
} from "@/constants/landing";

export default function Mission() {
  return (
    <section className="bg-white px-6 pb-10 pt-20 md:pb-14 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-brand-border">
              <Image
                src={MISSION_IMAGE}
                alt={MISSION_IMAGE_ALT}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-brand-ink sm:text-4xl">
                {MISSION_TITLE}
              </h2>
              <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand-teal to-brand-accent-glow lg:mx-0" />
              <p className="mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                {MISSION_TEXT}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
