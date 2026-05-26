import type { StoryStepContent } from "@/types/landing";

export default function StoryStep({
  number,
  title,
  description,
}: StoryStepContent) {
  return (
    <article className="rounded-2xl border border-brand-border bg-white px-6 py-7">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark-navy text-sm font-bold text-white">
        {number}
      </span>
      <h3 className="mt-5 text-lg font-bold text-brand-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-muted">
        {description}
      </p>
    </article>
  );
}
