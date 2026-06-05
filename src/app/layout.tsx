import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_DESCRIPTION =
  "Maaloomatiia Academy builds Data & AI capability for enterprise teams across MENA. Platform-aligned, practitioner-led training that turns technology adoption into real delivery.";

export const metadata: Metadata = {
  title: "Maaloomatiia",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Maaloomatiia Academy: Data & AI Capability Partner",
    description: SITE_DESCRIPTION,
    siteName: "Maaloomatiia Academy",
    locale: "en_US",
    type: "website",
  },
};

// Mirrors brand-dark-navy so the mobile browser chrome matches the site.
export const viewport: Viewport = {
  themeColor: "#060e14",
};

const SPLASH_MASK_SCRIPT = `(function(){try{var s=sessionStorage.getItem('maaloomatiia:loader-seen');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var h=/Chrome-Lighthouse|Speed Insights|HeadlessChrome|PageSpeed/i.test(navigator.userAgent);if(s||r||h){document.documentElement.classList.add('intro-skip');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-brand-dark-navy text-white">
        <Script id="splash-skip" strategy="beforeInteractive">
          {SPLASH_MASK_SCRIPT}
        </Script>
        <div
          id="splash-mask"
          aria-hidden
          className="fixed inset-0 z-[90] bg-brand-dark-navy"
        />
        {children}
      </body>
    </html>
  );
}
