import type { PillarContent } from "@/types/landing";

type PillarAccent = "teal" | "navy";

interface PillarCardProps extends PillarContent {
  accent: PillarAccent;
}

const HEADER_ACCENT: Record<PillarAccent, string> = {
  teal: "bg-brand-teal",
  navy: "bg-brand-dark-navy",
};

export default function PillarCard({
  accent,
  title,
  tagline,
  body,
}: PillarCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-border bg-white">
      <div className={`px-7 py-5 ${HEADER_ACCENT[accent]}`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="px-7 py-7">
        <p className="text-sm italic text-brand-muted">{tagline}</p>
        <p className="mt-4 text-base leading-relaxed text-brand-ink">{body}</p>
      </div>
    </article>
  );
}
