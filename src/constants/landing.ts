import type {
  AdoptStepContent,
  EcosystemCardContent,
  EcosystemStat,
  FeatureContent,
  StatContent,
} from "@/types/landing";

export const BRAND_NAME = "maaloomatiia";
export const CONTACT_ANCHOR_ID = "contact";

// Hero
export const HERO_HEADLINE_LINE_1 = "The Data & AI Capability Partner";
export const HERO_HEADLINE_LINE_2 = "for Enterprise Teams Across MENA";
export const HERO_DESCRIPTION =
  "Maaloomatiia doesn't just train — we build the capability your teams need to own the technology you've already invested in. On your platform, your data, your use cases.";
export const HERO_CTA_LABEL = "Get in Touch";

// Mission
export const MISSION_TITLE = "Our Mission";
export const MISSION_TEXT =
  "Maaloomatiia exists to close the gap between investing in technology and building real organizational capability. Across MENA, enterprise platforms were deployed faster than the skills to run them — and the gap was never the technology, it was people who could own and evolve what was built. Backed by MAGNOOS and the Midis ecosystem, we fuse enterprise delivery experience with hands-on, practitioner-led programs that create skilled, self-sufficient technology teams.";

// Feature cards
export const FEATURES: readonly FeatureContent[] = [
  {
    title: "Built for Your Environment",
    subtitle: "Scoped to Your Data",
    description:
      "Every program is scoped and customized for your data and workflows — each exercise maps to a real job to be done.",
  },
  {
    title: "Always Current",
    subtitle: "Updated Every Release",
    description:
      "Content is refreshed through direct platform partnerships, so teams learn what the product actually does today.",
  },
  {
    title: "Distributed Capability",
    subtitle: "Across the Whole Team",
    description:
      "Practitioners who built the systems transfer experience across your entire team — not just a select few.",
  },
  {
    title: "Ownership Stays with You",
    subtitle: "Capability That Remains",
    description:
      "Your team learns to operate, maintain, and evolve what was built. When we leave, the capability doesn't.",
  },
];

// Ecosystem
export const ECOSYSTEM_TITLE = "Backed by Magnoos. Connected to Midis.";
export const ECOSYSTEM_DESCRIPTION =
  "Maaloomatiia isn't a standalone training vendor. We're built on a regional technology ecosystem with the reach, infrastructure, and trust to deliver at enterprise scale.";
export const ECOSYSTEM_STATS: readonly EcosystemStat[] = [
  { value: "2,600+", label: "Technical Professionals" },
  { value: "30+", label: "Years in MENA" },
  { value: "13", label: "Countries" },
];
export const ECOSYSTEM_CARDS: readonly EcosystemCardContent[] = [
  {
    eyebrow: "Consultancy Arm",
    title: "Magnoos / MDS",
    description:
      "A regional Data & AI consultancy that builds the very platforms our Academy teaches teams to own.",
  },
  {
    eyebrow: "Parent Ecosystem",
    title: "Midis Group",
    description:
      "One of the largest technology groups in MENA — enterprise reach, infrastructure, and regional trust.",
  },
];
export const ECOSYSTEM_PARTNERS_LABEL = "Platform Partnerships";
export const ECOSYSTEM_PARTNERS: readonly string[] = [
  "Dataiku",
  "Informatica",
  "Cloudera",
  "Alteryx",
  "Microsoft",
  "Denodo",
  "DataRobot",
  "IBM",
  "Securiti",
  "Snowflake",
  "Google Cloud",
];

// How It Works — ADOPT framework
export const HOW_TITLE = "How It Works";
export const HOW_DESCRIPTION =
  "Our ADOPT framework turns platform investment into enterprise capability — five phases, from the first assessment to lasting knowledge retention.";
export const ADOPT_STEPS: readonly AdoptStepContent[] = [
  {
    letter: "A",
    title: "Assess",
    subtitle: "Map your starting point.",
    description:
      "Migrating or newly installed — we scope the training, pick the tier, and curate the labs.",
  },
  {
    letter: "D",
    title: "Deliver",
    subtitle: "The training.",
    description:
      "Instructor-led, built around your technology stack and your skill priorities.",
  },
  {
    letter: "O",
    title: "Oversee",
    subtitle: "Coach every lab.",
    description:
      "Practitioners guide your team through hands-on labs — unblocking, not lecturing.",
  },
  {
    letter: "P",
    title: "Practice",
    subtitle: "Your data. Your use case.",
    description:
      "An enterprise PoC or use case run on your real production workflows.",
  },
  {
    letter: "T",
    title: "Track",
    subtitle: "Ensure retention.",
    description:
      "Knowledge-retention checks that spot gaps early and keep skills sticky.",
  },
];

// Stats banner
export const STATS: readonly StatContent[] = [
  { target: 14, suffix: "+", label: "Years in MENA" },
  { target: 150, suffix: "+", label: "Data & AI Practitioners" },
  { target: 4000, suffix: "+", label: "Learners Trained" },
];

// Contact
export const CONTACT_TITLE = "Get in Touch";
export const CONTACT_SUBTITLE =
  "Ready to build real Data & AI capability? Let's talk.";
export const CONTACT_INTRO =
  "Whether you're adopting a new data platform, upskilling a team, or launching an enterprise capability program — we'll help you move from investment to real delivery.";
export const CONTACT_EMAIL = "training@maaloomatiia.com";
export const CONTACT_PHONE = "+971 58 550 5898";
export const CONTACT_WHATSAPP_URL = "https://wa.me/971585505898";
export const CONTACT_LOCATION =
  "Office 3310, Addax Tower, City of Lights, Al Reem Island — Abu Dhabi, UAE";
export const CONTACT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Addax%20Tower%2C%20Al%20Reem%20Island%2C%20Abu%20Dhabi";
export const CONTACT_LINKEDIN = "linkedin.com/company/maaloomatiia";

// Footer
export const FOOTER_TAGLINE = "Innovate. Enable. Elevate.";
export const FOOTER_COPYRIGHT = "© 2026 Maaloomatiia. All rights reserved.";
