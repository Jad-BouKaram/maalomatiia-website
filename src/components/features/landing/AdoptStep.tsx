import type { AdoptStepContent } from "@/types/landing";

export default function AdoptStep({
  letter,
  title,
  subtitle,
  description,
}: AdoptStepContent) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-brand-teal/10 bg-white/5 px-5 py-7 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal to-brand-teal-dark text-xl font-bold text-white">
        {letter}
      </span>
      <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-teal-light">
        {subtitle}
      </p>
      <p className="mt-3 text-base leading-relaxed text-white/60">
        {description}
      </p>
    </article>
  );
}
