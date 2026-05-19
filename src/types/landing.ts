import type { ComponentType } from "react";

export interface IconProps {
  className?: string;
}

export type IconComponent = ComponentType<IconProps>;

export interface FeatureContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface AdoptStepContent {
  letter: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface EcosystemCardContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface EcosystemStat {
  value: string;
  label: string;
}

export interface StatContent {
  target: number;
  suffix: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
