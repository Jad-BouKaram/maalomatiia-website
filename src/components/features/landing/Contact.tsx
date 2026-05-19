import ContactForm from "@/components/features/landing/ContactForm";
import LinkedinIcon from "@/components/ui/icons/LinkedinIcon";
import MailIcon from "@/components/ui/icons/MailIcon";
import MapPinIcon from "@/components/ui/icons/MapPinIcon";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import Reveal from "@/components/ui/Reveal";
import {
  CONTACT_ANCHOR_ID,
  CONTACT_EMAIL,
  CONTACT_INTRO,
  CONTACT_LINKEDIN,
  CONTACT_LOCATION,
  CONTACT_MAP_URL,
  CONTACT_PHONE,
  CONTACT_SUBTITLE,
  CONTACT_TITLE,
  CONTACT_WHATSAPP_URL,
} from "@/constants/landing";
import type { IconComponent } from "@/types/landing";

interface ContactDetail {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const DETAILS: readonly ContactDetail[] = [
  {
    icon: MailIcon,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: CONTACT_PHONE,
    href: CONTACT_WHATSAPP_URL,
    external: true,
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: CONTACT_LOCATION,
    href: CONTACT_MAP_URL,
    external: true,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: CONTACT_LINKEDIN,
    href: `https://${CONTACT_LINKEDIN}`,
    external: true,
  },
];

const ROW_FOCUS =
  "rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-glow";

export default function Contact() {
  return (
    <section
      id={CONTACT_ANCHOR_ID}
      className="scroll-mt-24 bg-brand-dark-surface px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {CONTACT_TITLE}
            </h2>
            <p className="mt-4 text-base text-white/60">{CONTACT_SUBTITLE}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-8">
              <p className="text-center text-base leading-relaxed text-white/60 lg:text-left">
                {CONTACT_INTRO}
              </p>
              <ul className="flex flex-col gap-3">
                {DETAILS.map(({ icon: Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-brand-teal/15 bg-brand-teal/10">
                        <Icon className="h-5 w-5 text-brand-teal-light" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-white/60">
                          {label}
                        </span>
                        <span className="block break-words text-base text-white/85 transition-colors group-hover:text-brand-teal-light">
                          {value}
                          {external ? (
                            <span className="sr-only"> (opens in a new tab)</span>
                          ) : null}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={`group flex items-start gap-4 ${ROW_FOCUS}`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
