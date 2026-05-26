import Reveal from "@/components/ui/Reveal";
import { PARTNERS, PARTNERS_LABEL } from "@/constants/landing";

export default function PlatformPartners() {
  return (
    <section className="bg-brand-dark-navy px-6 pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal-light">
              {PARTNERS_LABEL}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-brand-teal/15 bg-brand-teal/10 px-4 py-1.5 text-sm font-medium text-white"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
