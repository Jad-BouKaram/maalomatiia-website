import Contact from "@/components/features/landing/Contact";
import Features from "@/components/features/landing/Features";
import Gallery from "@/components/features/landing/Gallery";
import Hero from "@/components/features/landing/Hero";
import HowItWorks from "@/components/features/landing/HowItWorks";
import Mission from "@/components/features/landing/Mission";
import Navbar from "@/components/features/landing/Navbar";
import OurStory from "@/components/features/landing/OurStory";
import Pillars from "@/components/features/landing/Pillars";
import PlatformPartners from "@/components/features/landing/PlatformPartners";
import SiteFooter from "@/components/features/landing/SiteFooter";
import StatsBanner from "@/components/features/landing/StatsBanner";

export default function LandingPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-brand-teal focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Mission />
        <Features />
        <Pillars />
        <HowItWorks />
        <PlatformPartners />
        <OurStory />
        <StatsBanner />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
