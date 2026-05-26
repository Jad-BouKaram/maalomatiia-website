import type {
  AdoptStepContent,
  FeatureContent,
  GalleryImage,
  PillarContent,
  StatContent,
  StoryStepContent,
} from "@/types/landing";

export const BRAND_NAME = "maaloomatiia";
export const CONTACT_ANCHOR_ID = "contact";

// Hero
export const HERO_HEADLINE_LINE_1 = "The Data & AI Capability Partner";
export const HERO_HEADLINE_LINE_2 = "FOR MENA";
export const HERO_DESCRIPTION =
  "We build Data & AI capability for the teams, organizations, and nations shaping the region. Practitioner-led, bilingual, delivered where you work.";
export const HERO_CTA_LABEL = "Get in Touch";

// Mission
export const MISSION_TITLE = "Our Mission";
export const MISSION_TEXT =
  "We exist to close the gap between investing in Data & AI technology and building the people who can own it.";

// Feature cards
export const FEATURES: readonly FeatureContent[] = [
  {
    title: "Practitioner-Led",
    description:
      "Instructors are Magnoos delivery practitioners who have shipped the systems they teach.",
  },
  {
    title: "MENA-Native",
    description:
      "Arabic and English delivery, on the ground across KSA, UAE, Qatar, and Lebanon.",
  },
  {
    title: "Scoped to You",
    description:
      "Programs are designed around your team, your data, your stack, or your national workforce vision.",
  },
  {
    title: "Built to Stick",
    description:
      "Hands-on labs, real outputs, retention tracked. Capability that stays after we leave.",
  },
];

// Two paths: One academy
export const PILLARS_HEADING_START = "Two paths.";
export const PILLARS_HEADING_ACCENT = "One academy.";
export const PILLARS: readonly PillarContent[] = [
  {
    title: "Technology Platform Adoption",
    tagline: "Your team learns to own the tools you've invested in.",
    body: "Anchored on Dataiku, Informatica, Cloudera, Alteryx. Delivered through the ADOPT methodology: five phases from assessment to retention.",
  },
  {
    title: "Role & Skill-Based Programs",
    tagline: "Capability building beyond any single platform.",
    body: "Career-track bootcamps, AI productivity programs for business and technical teams, and national capacity programs.",
  },
];
export const PARTNERS_LABEL = "Platform Partnerships";
export const PARTNERS: readonly string[] = [
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

// How It Works: ADOPT framework
export const HOW_TITLE = "How It Works";
export const HOW_DESCRIPTION =
  "Our ADOPT framework turns platform investment into enterprise capability. Five phases, from the first assessment to lasting knowledge retention.";
export const ADOPT_STEPS: readonly AdoptStepContent[] = [
  {
    letter: "A",
    title: "Assess",
    subtitle: "Map your starting point.",
    description:
      "Migrating or newly installed. We scope the training, pick the tier, and curate the labs.",
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
      "Practitioners guide your team through hands-on labs. Unblocking, not lecturing.",
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

// Our Story: slide 4
export const STORY_EYEBROW = "Our Story";
export const STORY_HEADING_START = "How a consultancy";
export const STORY_HEADING_ACCENT = "became an academy.";
export const STORY_STEPS: readonly StoryStepContent[] = [
  {
    number: "1",
    title: "We built the systems",
    description:
      "Enterprise platforms were deployed across MENA, but adoption lagged behind investment.",
  },
  {
    number: "2",
    title: "We found the real gap",
    description:
      "The gap wasn't technology. It was skilled people who could own and evolve what was built.",
  },
  {
    number: "3",
    title: "We decided to close it",
    description:
      "Platform expertise fused with bootcamp-style enablement. Building capability, not dependency.",
  },
];
export const STORY_CALLOUT_TITLE_START = "Same hands that built the systems.";
export const STORY_CALLOUT_TITLE_ACCENT = "New mission: build the teams.";
export const STORY_CALLOUT_TEXT =
  "Maaloomatiia combines enterprise delivery experience with structured capability programs to create skilled, self-sufficient technology teams.";
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
  "Whether you're adopting a new data platform, upskilling a team, or launching an enterprise capability program, we'll help you move from investment to real delivery.";
export const CONTACT_EMAIL = "training@maaloomatiia.com";
export const CONTACT_WHATSAPP_URL = "https://wa.me/971585505898";
export const CONTACT_LOCATION =
  "Cayan Business Center, Barsha Heights, 8th Floor, Office 802, Dubai";
export const CONTACT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Cayan%20Business%20Center%2C%20Barsha%20Heights%2C%20Dubai";
export const CONTACT_LINKEDIN = "linkedin.com/company/maaloomatiia";

// Footer
export const FOOTER_COPYRIGHT = "© 2026 Maaloomatiia. All rights reserved.";

// Imagery: photo files live directly in the public/ folder
export const HERO_IMAGE = "/hero.jpeg";
export const MISSION_IMAGE = "/mission.jpeg";
export const MISSION_IMAGE_ALT =
  "A diverse enterprise team working through a data project together";

export const GALLERY_TITLE = "Who we work with";
export const GALLERY_SUBTITLE =
  "We work with enterprises and government entities adopting Data & AI platforms, public-sector and workforce-development bodies running national capability programs, L&D and HR teams building internal talent pipelines, foundations and universities running role-based cohorts, and teams commissioning focused skills workshops.";
export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    src: "/gallery-1.jpeg",
    alt: "Two colleagues learning together on a laptop",
  },
  {
    src: "/gallery-2.jpeg",
    alt: "A team collaborating around a laptop in the office",
  },
  {
    src: "/gallery-5.jpeg",
    alt: "An enterprise team in a working session",
  },
];
