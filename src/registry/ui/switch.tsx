"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { type ReactNode, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

interface SizeSpec {
  track: string;
  thumb: string;
  travelClass: string;
}

const SIZES: Record<Size, SizeSpec> = {
  sm: { track: "h:4 w:7", thumb: "w:3 h:2", travelClass: "ttx:2" },
  md: { track: "h:5 w:9", thumb: "w:4 h:3", travelClass: "ttx:3" },
  lg: { track: "h:6 w:11", thumb: "w:5 h:4", travelClass: "ttx:4" },
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface SwitchProps {
  /** Text beside the track. */
  label?: string;
  /** A line under the label, for the consequence of turning it on. */
  description?: string;
  /**
   * Starting state when you are not controlling it. Pair `checked` with
   * `onCheckedChange` instead if you are.
   */
  defaultChecked?: boolean;
  /** Controlled state. */
  checked?: boolean;
  /** Called with the new state. Required for a controlled switch. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Shown on the track, revealed as the thumb slides past it once checked.
   * Absent from the DOM while unchecked, not just hidden.
   */
  icon?: ReactNode;
  /** Track and thumb together. */
  size?: Size;
  /**
   * Corner radius, applied to the track and the thumb together. `squircle` uses
   * `corner-shape`.
   */
  shape?: Shape;
  /** Blocks interaction and dims the whole control, label included. */
  disabled?: boolean;
  /**
   * The thumb's slide when the state changes. Turn it off for an instant jump,
   * or when the user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
  /** The accessible name, for a switch with no visible label. */
  ariaLabel?: string;
}

/**
 * An on/off control, in three sizes and three shapes, with an optional icon
 * revealed on the track.
 */
export default function SwitchBase({
  label,
  description,
  defaultChecked,
  checked: controlledChecked,
  onCheckedChange,
  icon,
  size = "md",
  shape = "square",
  disabled = false,
  animated = true,
  className,
  focus = true,
  ariaLabel,
}: SwitchProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? controlledChecked ?? false,
  );
  const checked = controlledChecked ?? internalChecked;
  const id = useId();
  const { track, thumb, travelClass } = SIZES[size];

  const handleChange = (next: boolean) => {
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  const trackClasses = merge(
    outline,
    "p:r d:f ai:c m:0 px:1 tp:c tdu:150 ttf:io",
    track,
    SHAPES[shape],
    disabled
      ? "bw:1 bc:silver-2 bg:silver-1"
      : checked
        ? "bg:slate-12"
        : "bg:silver-1",
    disabled ? "" : "c:p",
    className,
  );

  const thumbClasses = [
    disabled ? "bg:silver-3" : "bg:white",
    thumb,
    SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Field.Root
      className={`d:f fd:c g:1 ${disabled ? "c:na" : ""}`}
      disabled={disabled}
    >
      <div className="d:f ai:c g:2">
        <Switch.Root
          id={id}
          checked={checked}
          onCheckedChange={handleChange}
          aria-label={ariaLabel}
          className={trackClasses}
        >
          {icon && checked && (
            <span className="d:f p:a l:1 ai:c jc:c w:3 h:3 c:white">
              {icon}
            </span>
          )}
          <Switch.Thumb
            className={merge(
              thumbClasses,
              checked ? travelClass : "",
              animated ? "tp:t tdu:200 ttf:io" : "",
            )}
          />
        </Switch.Root>
        {label && (
          <Field.Label
            htmlFor={id}
            className={`fs:sm fw:500 us:none ${
              disabled ? "c:slate-5" : "c:slate-10 c:p"
            }`}
          >
            {label}
          </Field.Label>
        )}
      </div>

      {description && (
        <p className="pl:12 m:0 c:slate-6 fs:xs fw:400">{description}</p>
      )}
    </Field.Root>
  );
}
