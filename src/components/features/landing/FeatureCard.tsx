import type { FeatureContent, IconComponent } from "@/types/landing";

interface FeatureCardProps extends FeatureContent {
  icon: IconComponent;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-brand-border bg-brand-surface px-6 py-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-teal/15 bg-brand-teal/10">
        <Icon className="h-6 w-6 text-brand-teal-dark" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-brand-ink">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-brand-muted">
        {description}
      </p>
    </article>
  );
}
