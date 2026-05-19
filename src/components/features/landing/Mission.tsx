import Reveal from "@/components/ui/Reveal";
import { MISSION_TEXT, MISSION_TITLE } from "@/constants/landing";

export default function Mission() {
  return (
    <section className="bg-white px-6 pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-brand-ink sm:text-4xl">
            {MISSION_TITLE}
          </h2>
          <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand-teal to-brand-accent-glow" />
          <p className="mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
            {MISSION_TEXT}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
