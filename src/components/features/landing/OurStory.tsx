import StoryStep from "@/components/features/landing/StoryStep";
import Reveal from "@/components/ui/Reveal";
import {
  STORY_CALLOUT_TEXT,
  STORY_CALLOUT_TITLE_ACCENT,
  STORY_CALLOUT_TITLE_START,
  STORY_EYEBROW,
  STORY_HEADING_ACCENT,
  STORY_HEADING_START,
  STORY_STEPS,
} from "@/constants/landing";

export default function OurStory() {
  return (
    <section className="bg-brand-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
              {STORY_EYEBROW}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              {STORY_HEADING_START}{" "}
              <span className="text-brand-teal-deeper">
                {STORY_HEADING_ACCENT}
              </span>
            </h2>
            <span className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand-teal to-brand-accent-glow" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STORY_STEPS.map((step) => (
              <StoryStep key={step.number} {...step} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-brand-dark-navy px-7 py-9 sm:px-10 sm:py-10">
            <p className="text-xl font-bold text-white sm:text-2xl">
              {STORY_CALLOUT_TITLE_START}{" "}
              <span className="text-brand-teal-light">
                {STORY_CALLOUT_TITLE_ACCENT}
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              {STORY_CALLOUT_TEXT}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
