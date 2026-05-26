import PillarCard from "@/components/features/landing/PillarCard";
import Reveal from "@/components/ui/Reveal";
import {
  PILLARS,
  PILLARS_HEADING_ACCENT,
  PILLARS_HEADING_START,
} from "@/constants/landing";

const PILLAR_ACCENTS = ["teal", "navy"] as const;

export default function Pillars() {
  return (
    <section className="bg-brand-dark-navy px-6 pb-10 pt-20 md:pb-14 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {PILLARS_HEADING_START}{" "}
              <span className="text-brand-teal-light">
                {PILLARS_HEADING_ACCENT}
              </span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PILLARS.map((pillar, index) => (
              <PillarCard
                key={pillar.title}
                accent={PILLAR_ACCENTS[index]}
                {...pillar}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
