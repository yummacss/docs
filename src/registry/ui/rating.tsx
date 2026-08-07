"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

type Shadow = "none" | "inset" | "outset";

// The shadow lands on each star, not on a surrounding card - there is no card
// here, and both shadow demos styled the stars themselves.
const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bg-white bc-silver-2 bw-1 bs-i-sm",
  outset: "bg-white bc-silver-2 bw-1 bs-o-xs",
};

export interface RatingProps {
  label?: string;
  /** How many stars to draw. */
  count?: number;
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  shadow?: Shadow;
  /** The press-scale on each star. */
  animate?: boolean;
  /** Shown under the stars once nothing is selected. */
  emptyHint?: string;
  className?: string;
}

export default function RatingBase({
  label,
  count = 5,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  shadow = "none",
  animate = true,
  emptyHint = "Click to rate",
  className,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? 0,
  );
  const value = controlledValue ?? internalValue;

  const handleChange = (next: number) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const starClasses = (pressed: boolean) =>
    [
      "d-f ai-c jc-c w-9 h-9 br-lg us-none",
      shadowClass || "bw-0",
      disabled
        ? "c-na o-60"
        : "c-p fv:oo--1 fv:oc-indigo-5",
      pressed ? "c-yellow-5" : "c-slate-4",
      !disabled && !pressed ? "h:c-slate-6" : "",
      shadowClass ? "" : "bg-transparent",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div
      className={["d-f fd-c ai-c jc-c g-4 p-8 h-56", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <span className="c-slate-10 fs-sm fw-500">{label}</span>}

      <div className="d-f g-1">
        {Array.from({ length: count }, (_, index) => index + 1).map((star) => {
          const filled = star <= value;
          const icon = (
            <Star
              className="w-6 h-6"
              style={{ fill: filled ? "currentColor" : "none" }}
            />
          );

          return (
            <Toggle
              key={star}
              pressed={filled}
              disabled={disabled}
              onPressedChange={() => handleChange(star === value ? 0 : star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className={starClasses(filled)}
              render={
                animate && !disabled
                  ? (props) => (
                      <motion.button
                        type="button"
                        {...(props as HTMLMotionProps<"button">)}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {icon}
                      </motion.button>
                    )
                  : undefined
              }
            >
              {animate && !disabled ? undefined : icon}
            </Toggle>
          );
        })}
      </div>

      <span className="c-slate-6 fs-xs">
        {value > 0 ? `${value} / ${count}` : emptyHint}
      </span>
    </div>
  );
}
