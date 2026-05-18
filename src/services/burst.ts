import type { BurstParticle, Streak } from "@/types/loading";

const PARTICLE_MIN_DISTANCE_PX = 90;
const PARTICLE_DISTANCE_RANGE_PX = 150;
const PARTICLE_MIN_SIZE_PX = 2;
const PARTICLE_SIZE_RANGE_PX = 4;
const PARTICLE_MAX_DELAY_MS = 120;
const PARTICLE_MIN_DURATION_MS = 700;
const PARTICLE_DURATION_RANGE_MS = 400;
const PARTICLE_ANGLE_JITTER = 0.3;

const STREAK_MIN_HEIGHT_PX = 70;
const STREAK_HEIGHT_RANGE_PX = 80;
const STREAK_ANGLE_JITTER_DEG = 6;
const STREAK_DELAY_STEP_MS = 12;

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateBurstParticles(
  count: number,
  seed: number
): BurstParticle[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + rand() * PARTICLE_ANGLE_JITTER;
    const distance =
      PARTICLE_MIN_DISTANCE_PX + rand() * PARTICLE_DISTANCE_RANGE_PX;
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      size: PARTICLE_MIN_SIZE_PX + rand() * PARTICLE_SIZE_RANGE_PX,
      delay: rand() * PARTICLE_MAX_DELAY_MS,
      duration: PARTICLE_MIN_DURATION_MS + rand() * PARTICLE_DURATION_RANGE_MS,
    };
  });
}

export function generateStreaks(count: number, seed: number): Streak[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    angle: i * (360 / count) + rand() * STREAK_ANGLE_JITTER_DEG,
    height: STREAK_MIN_HEIGHT_PX + rand() * STREAK_HEIGHT_RANGE_PX,
    delay: i * STREAK_DELAY_STEP_MS,
  }));
}
