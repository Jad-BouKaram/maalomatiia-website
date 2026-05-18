import Image from "next/image";
import {
  LANDING_LOGO_ALT,
  LANDING_LOGO_SIZES,
  LANDING_LOGO_SRC,
  LANDING_TAGLINE,
} from "@/constants/landing";

export default function Hero() {
  return (
    <header className="flex w-full flex-col items-center">
      <div className="lp-logo">
        <Image
          src={LANDING_LOGO_SRC}
          alt={LANDING_LOGO_ALT}
          fill
          priority
          sizes={LANDING_LOGO_SIZES}
          className="object-contain"
        />
      </div>
      <p className="lp-tagline mt-2 text-center font-light italic uppercase text-white/55">
        {LANDING_TAGLINE}
      </p>
    </header>
  );
}
