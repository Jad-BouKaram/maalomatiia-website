import type { CSSProperties } from "react";
import type { Streak } from "@/types/loading";

interface StreaksProps {
  streaks: readonly Streak[];
}

export default function Streaks({ streaks }: StreaksProps) {
  return (
    <>
      {streaks.map((streak, index) => (
        <span
          key={index}
          className="ls-streak"
          style={
            {
              height: streak.height,
              "--angle": `${streak.angle}deg`,
              animationDelay: `${streak.delay}ms`,
            } as CSSProperties
          }
          aria-hidden
        />
      ))}
    </>
  );
}
