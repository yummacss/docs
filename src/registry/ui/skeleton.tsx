"use client";

import { motion } from "motion/react";

type Shape = "line" | "block" | "circle";
type Tone = "default" | "subtle";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
//
// Each shape carries a default size so a bare <Skeleton /> is visible. Anything
// you pass in className lands after these and wins.
const SHAPES: Record<Shape, string> = {
  line: "h-3 w-100% br-xs",
  block: "h-8 w-24 br-lg",
  circle: "w-10 h-10 br-9999",
};

const TONES: Record<Tone, string> = {
  default: "bg-silver-2",
  subtle: "bg-silver-1",
};

export interface SkeletonProps {
  shape?: Shape;
  tone?: Tone;
  /** The pulse. Turn it off for a static placeholder. */
  animate?: boolean;
  /** Seconds to offset the pulse, so rows in a list do not beat in unison. */
  delay?: number;
  className?: string;
}

export default function SkeletonBase({
  shape = "line",
  tone = "default",
  animate = true,
  delay = 0,
  className,
}: SkeletonProps) {
  const classes = [SHAPES[shape], TONES[tone], className]
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
