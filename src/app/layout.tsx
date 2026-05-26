import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-brand-dark-navy text-white">
        {children}
      </body>
    </html>
  );
}
