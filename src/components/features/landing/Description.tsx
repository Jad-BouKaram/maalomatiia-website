import { LANDING_DESCRIPTION } from "@/constants/landing";

export default function Description() {
  return (
    <section className="mt-5 w-full max-w-2xl px-2 text-center md:mt-6">
      <p className="lp-description font-light leading-relaxed text-white/85">
        {LANDING_DESCRIPTION}
      </p>
    </section>
  );
}
