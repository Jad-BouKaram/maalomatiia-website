import BulletDot from "@/components/ui/BulletDot";
import { LANDING_BULLETS } from "@/constants/landing";

export default function BulletList() {
  return (
    <section className="mt-5 w-full max-w-xl px-2 md:mt-6">
      <ul className="flex flex-col gap-2.5 md:gap-3">
        {LANDING_BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <BulletDot />
            <p className="lp-bullet font-light leading-relaxed text-white/85">
              {bullet}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
