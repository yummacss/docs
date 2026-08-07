"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";

type Shadow = "none" | "inset" | "outset";

/**
 * One option in a single-choice picker - a mood, a face - instead of a
 * repeated star. Distinct from the star mode: exactly one of these is ever
 * "on" at a time, rather than N filled up to a value.
 */
export interface RatingIcon {
  icon: ReactNode;
  label: string;
  /** Text color while this is the selected option. */
  activeClassName?: string;
}

// The shadow lands on each star, not on a surrounding card - there is no card
// here, and both shadow demos styled the stars themselves.
const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bg-white bc-silver-2 bw-1 bs-i-sm",
  outset: "bg-white bc-silver-2 bw-1 bs-o-xs",
};

export interface RatingProps {
  label?: string;
  /** How many stars to draw. Ignored when `icons` is set. */
  count?: number;
  /**
   * A custom icon set, for a single-choice picker instead of N stars. When
   * set, `value`/`defaultValue` index into it (0-based, `-1` for none) rather
   * than counting filled stars, and `count`/`shadow` are ignored.
   */
  icons?: RatingIcon[];
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  shadow?: Shadow;
  /** The press-scale on each star. */
  animate?: boolean;
  /** Shown under the stars once nothing is selected. */
  emptyHint?: string;
  /** Extra content below the hint text, like a feedback field. */
  children?: ReactNode;
  className?: string;
}

export default function RatingBase({
  label,
  count = 5,
  icons,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  shadow = "none",
  animate = true,
  emptyHint = "Click to rate",
  children,
  className,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? (icons ? -1 : 0),
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

  const iconClasses = (option: RatingIcon, active: boolean) =>
    [
      "d-f ai-c jc-c w-12 h-12 bw-0 br-lg us-none",
      disabled ? "c-na o-60" : "c-p fv:oo--1 fv:oc-indigo-5",
      active ? (option.activeClassName ?? "c-yellow-5") : "c-slate-4",
      !disabled && !active ? "h:c-slate-6" : "",
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

      <div className={`d-f ${icons ? "g-3" : "g-1"}`}>
        {icons
          ? icons.map((option, index) => {
              const active = index === value;
              return (
                <Toggle
                  key={option.label}
                  pressed={active}
                  disabled={disabled}
                  onPressedChange={() =>
                    handleChange(active ? -1 : index)
                  }
                  aria-label={option.label}
                  className={iconClasses(option, active)}
                  render={
                    animate && !disabled
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {option.icon}
                          </motion.button>
                        )
                      : undefined
                  }
                >
                  {animate && !disabled ? undefined : option.icon}
                </Toggle>
              );
            })
          : Array.from({ length: count }, (_, index) => index + 1).map(
              (star) => {
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
                    onPressedChange={() =>
                      handleChange(star === value ? 0 : star)
                    }
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
              },
            )}
      </div>

      <span className="c-slate-6 fs-xs">
        {icons
          ? value >= 0
            ? icons[value].label
            : emptyHint
          : value > 0
            ? `${value} / ${count}`
            : emptyHint}
      </span>

      {children}
    </div>
  );
}
