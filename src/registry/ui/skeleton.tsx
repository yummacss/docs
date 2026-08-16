"use client";

import { motion } from "motion/react";

type Shape = "line" | "block" | "circle";
type Tone = "default" | "subtle";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const RADII: Record<Shape, string> = {
  line: "br-xs",
  block: "br-lg",
  circle: "br-9999",
};

// Each shape carries a default size so a bare <Skeleton /> is visible. `size`
// *replaces* this rather than being appended to it: a second width class in the
// output would not reliably win, because which of two utilities applies is
// decided by the stylesheet's rule order & not by their order in the attribute.
const SIZES: Record<Shape, string> = {
  line: "h-3 w-100%",
  block: "h-8 w-24",
  circle: "w-10 h-10",
};

const TONES: Record<Tone, string> = {
  default: "bg-silver-2",
  subtle: "bg-silver-1",
};

export interface SkeletonProps {
  shape?: Shape;
  tone?: Tone;
  /**
   * Replaces the shape's default size, as literal width & height utilities:
   * `"w-9 h-9"`. Written out rather than composed from a scale value, so the
   * class scanner can see it in your source.
   */
  size?: string;
  /** The pulse. Turn it off for a static placeholder. */
  animate?: boolean;
  /** Seconds to offset the pulse, so rows in a list do not beat in unison. */
  delay?: number;
  className?: string;
}

export default function SkeletonBase({
  shape = "line",
  tone = "default",
  size,
  animate = true,
  delay = 0,
  className,
}: SkeletonProps) {
  const classes = [RADII[shape], size ?? SIZES[shape], TONES[tone], className]
    .filter(Boolean)
    .join(" ");

  // A placeholder has nothing to announce. The region that swaps it for real
  // content owns aria-busy; every bar reading itself out would be noise.
  if (!animate) return <div aria-hidden className={classes} />;

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
      className={classes}
    />
  );
}
