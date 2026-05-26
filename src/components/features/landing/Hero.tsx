import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import MailIcon from "@/components/ui/icons/MailIcon";
import Reveal from "@/components/ui/Reveal";
import {
  CONTACT_ANCHOR_ID,
  HERO_CTA_LABEL,
  HERO_DESCRIPTION,
  HERO_HEADLINE_LINE_1,
  HERO_HEADLINE_LINE_2,
  HERO_IMAGE,
} from "@/constants/landing";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-brand-dark-navy px-6 pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-dark-navy/85" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {HERO_HEADLINE_LINE_1}{" "}
            <span className="bg-gradient-to-r from-brand-teal-light to-brand-accent-glow bg-clip-text text-transparent">
              {HERO_HEADLINE_LINE_2}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {HERO_DESCRIPTION}
          </p>
          <div className="mt-9">
            <CtaButton
              targetId={CONTACT_ANCHOR_ID}
              label={HERO_CTA_LABEL}
              icon={<MailIcon className="h-4 w-4" />}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
