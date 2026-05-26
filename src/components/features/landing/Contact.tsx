import ContactForm from "@/components/features/landing/ContactForm";
import IconLink from "@/components/ui/IconLink";
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
  CONTACT_SUBTITLE,
  CONTACT_TITLE,
  CONTACT_WHATSAPP_URL,
} from "@/constants/landing";

export default function Contact() {
  return (
    <section
      id={CONTACT_ANCHOR_ID}
      className="scroll-mt-24 bg-brand-dark-surface px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {CONTACT_TITLE}
            </h2>
            <p className="mt-4 text-base text-white/60">{CONTACT_SUBTITLE}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-8">
              <p className="text-center text-base leading-relaxed text-white/60 lg:text-left">
                {CONTACT_INTRO}
              </p>

              <div className="flex items-start gap-4">
                <IconLink
                  href={CONTACT_MAP_URL}
                  ariaLabel="Open address in Google Maps"
                  external
                >
                  <MapPinIcon className="h-5 w-5" />
                </IconLink>
                <span className="break-words pt-1 text-base text-white/85">
                  {CONTACT_LOCATION}
                </span>
              </div>

              <div className="flex justify-center gap-4 lg:justify-start">
                <IconLink
                  href={`mailto:${CONTACT_EMAIL}`}
                  ariaLabel="Email Maaloomatiia"
                >
                  <MailIcon className="h-5 w-5" />
                </IconLink>
                <IconLink
                  href={CONTACT_WHATSAPP_URL}
                  ariaLabel="Message Maaloomatiia on WhatsApp"
                  external
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </IconLink>
                <IconLink
                  href={`https://${CONTACT_LINKEDIN}`}
                  ariaLabel="Maaloomatiia on LinkedIn"
                  external
                >
                  <LinkedinIcon className="h-5 w-5" />
                </IconLink>
              </div>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
