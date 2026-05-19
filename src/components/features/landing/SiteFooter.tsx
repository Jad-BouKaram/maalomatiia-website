import Image from "next/image";
import { BRAND_NAME, FOOTER_COPYRIGHT, FOOTER_TAGLINE } from "@/constants/landing";

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-teal/10 bg-brand-dark-navy px-6 py-10 text-center">
      <Image
        src="/Maaloomatiia_Logo_Full.svg"
        alt={BRAND_NAME}
        width={208}
        height={60}
        unoptimized
        className="mx-auto h-auto w-40"
      />
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/70">
        {FOOTER_TAGLINE}
      </p>
      <p className="mt-2 text-xs tracking-wide text-white/55">
        {FOOTER_COPYRIGHT}
      </p>
    </footer>
  );
}
