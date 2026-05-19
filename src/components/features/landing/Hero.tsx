import CtaButton from "@/components/ui/CtaButton";
import MailIcon from "@/components/ui/icons/MailIcon";
import {
  CONTACT_ANCHOR_ID,
  HERO_CTA_LABEL,
  HERO_DESCRIPTION,
  HERO_HEADLINE_LINE_1,
  HERO_HEADLINE_LINE_2,
} from "@/constants/landing";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-dark-navy px-6 pb-24 pt-36 md:pb-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block text-white">{HERO_HEADLINE_LINE_1}</span>
          <span className="block bg-gradient-to-r from-brand-teal-light to-brand-accent-glow bg-clip-text text-transparent">
            {HERO_HEADLINE_LINE_2}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          {HERO_DESCRIPTION}
        </p>
        <div className="mt-9">
          <CtaButton
            targetId={CONTACT_ANCHOR_ID}
            label={HERO_CTA_LABEL}
            icon={<MailIcon className="h-4 w-4" />}
          />
        </div>
      </div>
    </section>
  );
}
