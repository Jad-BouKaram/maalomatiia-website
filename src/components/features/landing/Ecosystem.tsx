import EcosystemCard from "@/components/features/landing/EcosystemCard";
import Reveal from "@/components/ui/Reveal";
import {
  ECOSYSTEM_CARDS,
  ECOSYSTEM_DESCRIPTION,
  ECOSYSTEM_PARTNERS,
  ECOSYSTEM_PARTNERS_LABEL,
  ECOSYSTEM_STATS,
  ECOSYSTEM_TITLE,
} from "@/constants/landing";

export default function Ecosystem() {
  return (
    <section className="bg-white px-6 pb-28 pt-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand-ink sm:text-4xl">
              {ECOSYSTEM_TITLE}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted">
              {ECOSYSTEM_DESCRIPTION}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {ECOSYSTEM_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-brand-dark-navy px-6 py-7 text-center"
              >
                <p className="text-3xl font-bold text-brand-teal-light sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/65">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ECOSYSTEM_CARDS.map((card) => (
              <EcosystemCard key={card.title} {...card} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal-dark">
              {ECOSYSTEM_PARTNERS_LABEL}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {ECOSYSTEM_PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-brand-border bg-brand-surface px-4 py-1.5 text-sm font-medium text-brand-ink"
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
