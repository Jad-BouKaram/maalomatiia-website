import Image from "next/image";
import ScrollLink from "@/components/ui/ScrollLink";
import { BRAND_NAME } from "@/constants/landing";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center border-b border-brand-teal/10 bg-brand-dark-navy/85 px-6 py-2.5 backdrop-blur-md md:px-8">
      <ScrollLink
        targetId="top"
        ariaLabel={`${BRAND_NAME}, back to top`}
        className="inline-flex min-h-11 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow"
      >
        <Image
          src="/Maaloomatiia_Logo_Full.svg"
          alt={BRAND_NAME}
          width={208}
          height={60}
          priority
          unoptimized
          className="h-auto w-40 sm:w-52"
        />
      </ScrollLink>
    </nav>
  );
}
