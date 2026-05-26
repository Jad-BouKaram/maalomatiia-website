import FeatureCard from "@/components/features/landing/FeatureCard";
import KeyIcon from "@/components/ui/icons/KeyIcon";
import MapPinIcon from "@/components/ui/icons/MapPinIcon";
import TargetIcon from "@/components/ui/icons/TargetIcon";
import UsersIcon from "@/components/ui/icons/UsersIcon";
import Reveal from "@/components/ui/Reveal";
import { FEATURES } from "@/constants/landing";

const FEATURE_ICONS = [UsersIcon, MapPinIcon, TargetIcon, KeyIcon] as const;

export default function Features() {
  return (
    <section className="bg-white px-6 pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={FEATURE_ICONS[index]}
                {...feature}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
