import type { CSSProperties } from "react";
import type { BurstParticle } from "@/types/loading";

interface ParticlesProps {
  particles: readonly BurstParticle[];
}

export default function Particles({ particles }: ParticlesProps) {
  return (
    <>
      {particles.map((particle, index) => (
        <span
          key={index}
          className="ls-particle"
          style={
            {
              width: particle.size,
              height: particle.size,
              "--tx": `${particle.tx}px`,
              "--ty": `${particle.ty}px`,
              animationDuration: `${particle.duration}ms`,
              animationDelay: `${particle.delay}ms`,
            } as CSSProperties
          }
          aria-hidden
        />
      ))}
    </>
  );
}
