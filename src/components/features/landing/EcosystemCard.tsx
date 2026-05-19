import type { EcosystemCardContent } from "@/types/landing";

export default function EcosystemCard({
  eyebrow,
  title,
  description,
}: EcosystemCardContent) {
  return (
    <article className="rounded-2xl border border-brand-border bg-brand-surface px-7 py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal-dark">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-bold text-brand-ink">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-brand-muted">
        {description}
      </p>
    </article>
  );
}
