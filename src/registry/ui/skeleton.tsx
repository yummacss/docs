"use client";

import { merge } from "yummacss/merge";

type Shape = "line" | "block" | "circle";
type Tone = "default" | "subtle";

const SKELETON_MOTION = `
  @keyframes yui-skeleton-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .yui-skeleton-pulse {
    animation: yui-skeleton-pulse 1s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-skeleton-pulse { animation: none; }
  }
`;

const PULSE = "yui-skeleton-pulse";

const RADII: Record<Shape, string> = {
  line: "br:xs",
  block: "br:lg",
  circle: "br:9999",
};

const SIZES: Record<Shape, string> = {
  line: "h:3 w:100%",
  block: "h:8 w:24",
  circle: "w:10 h:10",
};

const TONES: Record<Tone, string> = {
  default: "bg:silver-2",
  subtle: "bg:silver-1",
};

export interface SkeletonProps {
  /**
   * Corner radius, plus a default size: `line` for text, `block` for a control
   * or thumbnail, `circle` for an avatar. Change the size with `dimensions`.
   */
  shape?: Shape;
  /** `subtle` is one step lighter, for the secondary line in a pair. */
  tone?: Tone;
  /**
   * Replaces the shape's default size, as literal width and height utilities:
   * `"w-9 h-9"`. It replaces rather than adds to them, because a second width
   * class would not reliably win: which of two utilities applies is decided by
   * the stylesheet's rule order, not by their order in the attribute. Spelled
   * out in full rather than built from a scale value, so the class scanner can
   * see it in your source.
   */
  dimensions?: string;
  /**
   * The pulse. Turn it off for a static placeholder, or when the user has asked
   * for reduced motion.
   */
  animated?: boolean;
  /**
   * Seconds to offset the pulse by. Stagger a list with `delay={index * 0.15}`
   * so its rows do not beat in unison.
   */
  delay?: number;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A placeholder for content that has not arrived yet, in three shapes and two
 * tones, with a pulse you can stagger or switch off.
 */
export default function SkeletonBase({
  shape = "line",
  tone = "default",
  dimensions,
  animated = true,
  delay = 0,
  className,
}: SkeletonProps) {
  const classes = merge(
    RADII[shape],
    dimensions ?? SIZES[shape],
    TONES[tone],
    className,
  );

  if (!animated) return <div aria-hidden className={classes} />;

  return (
    <>
      <style href="yumma-ui-skeleton-motion" precedence="default">
        {SKELETON_MOTION}
      </style>
      <div
        aria-hidden
        className={`${classes} ${PULSE}`}
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      />
    </>
  );
}
