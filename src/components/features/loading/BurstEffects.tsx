import Particles from "@/components/features/loading/Particles";
import Shockwaves from "@/components/features/loading/Shockwaves";
import Streaks from "@/components/features/loading/Streaks";
import {
  BURST_PARTICLE_COUNT,
  BURST_SEED,
  STREAK_COUNT,
} from "@/constants/loading";
import { generateBurstParticles, generateStreaks } from "@/services/burst";

const PARTICLES = generateBurstParticles(BURST_PARTICLE_COUNT, BURST_SEED);
const STREAKS = generateStreaks(STREAK_COUNT, BURST_SEED + 1);

export default function BurstEffects() {
  return (
    <>
      <Shockwaves />
      <Particles particles={PARTICLES} />
      <Streaks streaks={STREAKS} />
    </>
  );
}
