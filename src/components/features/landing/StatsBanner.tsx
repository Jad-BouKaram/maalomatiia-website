import StatCounter from "@/components/features/landing/StatCounter";
import { STATS } from "@/constants/landing";

export default function StatsBanner() {
  return (
    <section className="bg-brand-teal-deeper px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
