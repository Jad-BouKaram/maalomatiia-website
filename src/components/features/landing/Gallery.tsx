import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import {
  GALLERY_IMAGES,
  GALLERY_SUBTITLE,
  GALLERY_TITLE,
} from "@/constants/landing";

export default function Gallery() {
  return (
    <section className="bg-brand-dark-navy px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {GALLERY_TITLE}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              {GALLERY_SUBTITLE}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-brand-teal/10"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
