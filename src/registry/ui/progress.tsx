"use client";

import { Progress } from "@base-ui/react/progress";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

const PROGRESS_MOTION = `
  @keyframes yui-progress-slide {
    from { translate: -100% 0; }
    to { translate: 100% 0; }
  }
  .yui-progress-slide {
    animation: yui-progress-slide 1s ease-in-out infinite;
  }
`;

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface ProgressProps {
  /**
   * The current value, 0-100. Pass `null` for an indeterminate, always-animated
   * sliding bar. There is no fill level to show, so the schema here cannot demo
   * it, but the prop accepts it.
   */
  value: number | null;
  /**
   * Text above the track, correctly wired to it via Base UI's own
   * Progress.Label.
   */
  label: ReactNode;
  /** Corner radius on both the track and the indicator. */
  shape?: Shape;
  /**
   * Wraps the bar in a padded card. `none` renders it bare, with no card at
   * all.
   */
  shadow?: Shadow;
  /**
   * The indicator's width transition as `value` changes. Indeterminate progress
   * always animates regardless of this.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A labelled progress bar, determinate or indeterminate, in three shapes with
 * an optional card shadow.
 */
export default function ProgressBase({
  value,
  label,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
}: ProgressProps) {
  const isCard = shadow !== "none";
  const isIndeterminate = value === null;

  const rootClasses = merge(
    "d:f fd:c g:2 w:64",
    isCard ? "p:4 bg:white bc:silver-2 br:lg bw:1" : "",
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    className,
  );

  const trackClasses = ["o:h h:2 bg:silver-2", SHAPES[shape]]
    .filter(Boolean)
    .join(" ");

  return (
    <Progress.Root className={rootClasses} value={value}>
      <style href="yumma-ui-progress-motion" precedence="default">
        {PROGRESS_MOTION}
      </style>
      <div className="d:f jc:sb ai:c">
        <Progress.Label className="c:slate-10 fs:sm fw:500">
          {label}
        </Progress.Label>
        <Progress.Value className="c:slate-8 fs:sm" />
      </div>
      <Progress.Track className={trackClasses}>
        {isIndeterminate ? (
          <Progress.Indicator
            className={[
              "h:100% w:100% bg:slate-12 yui-progress-slide",
              SHAPES[shape],
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ) : (
          <Progress.Indicator
            className={(state) =>
              [
                "h:100%",
                animated ? "tp:w tdu:500 ttf:eo" : "",
                SHAPES[shape],
                state.status === "complete" ? "bg:green" : "bg:slate-12",
              ]
                .filter(Boolean)
                .join(" ")
            }
          />
        )}
      </Progress.Track>
    </Progress.Root>
  );
}
