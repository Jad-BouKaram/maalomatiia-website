export type LoadingPhase =
  | "idle"
  | "enter"
  | "loading"
  | "preBurst"
  | "burst"
  | "done";

export interface BurstParticle {
  tx: number;
  ty: number;
  size: number;
  delay: number;
  duration: number;
}

export interface Streak {
  angle: number;
  height: number;
  delay: number;
}
