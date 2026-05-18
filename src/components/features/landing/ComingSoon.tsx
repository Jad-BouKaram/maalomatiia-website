import {
  LANDING_COMING_SOON_SUBTITLE,
  LANDING_COMING_SOON_TITLE,
} from "@/constants/landing";

export default function ComingSoon() {
  return (
    <section className="mt-5 flex flex-col items-center md:mt-6">
      <h2 className="lp-coming bg-gradient-to-br from-brand-teal-light via-brand-accent-glow to-brand-teal bg-clip-text text-center font-bold uppercase tracking-[0.18em] text-transparent">
        {LANDING_COMING_SOON_TITLE}
      </h2>
      <p className="lp-stay mt-2 text-center font-light italic tracking-[0.18em] text-white/55">
        {LANDING_COMING_SOON_SUBTITLE}
      </p>
    </section>
  );
}
