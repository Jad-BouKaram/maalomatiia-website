import AdoptStep from "@/components/features/landing/AdoptStep";
import Reveal from "@/components/ui/Reveal";
import { ADOPT_STEPS, HOW_DESCRIPTION, HOW_TITLE } from "@/constants/landing";

export default function HowItWorks() {
  return (
    <section className="bg-brand-dark-navy px-6 pb-10 pt-10 md:pb-14 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {HOW_TITLE}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              {HOW_DESCRIPTION}
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {ADOPT_STEPS.map((step) => (
              <AdoptStep key={step.letter} {...step} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
