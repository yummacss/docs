"use client";

import { NumberField } from "@base-ui/react/number-field";
import { AltArrowDownIcon, AltArrowUpIcon } from "@solar-icons/react/outline";
import type { ComponentProps } from "react";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

// the group draws focus, so the outline wraps the input and both buttons
const GROUP_FOCUS = "fw:os:s fw:ow:3 fw:oo:0 fw:oc:slate-4/60 fw:bc:slate-6";

const STEP =
  "d:f ai:c jc:c bg:white c:slate-10 us:none c:p h:bg:silver-1/50 a:bg:silver-2";

const STEP_SIZES: Record<Size, string> = {
  sm: "w:6 h:4",
  md: "w:7 h:5",
  lg: "w:8 h:6",
};

const INPUT_SIZES: Record<Size, string> = {
  sm: "h:8 w:28 pl:3 fs:sm",
  md: "h:10 w:32 pl:3 fs:md",
  lg: "h:12 w:36 pl:4 fs:lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:4 h:4",
};

const GROUP_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

export interface NumberFieldProps
  extends Omit<ComponentProps<typeof NumberField.Root>, "className" | "id"> {
  /**
   * Text above the control. Also a scrub area: drag left or right on it to
   * change the value.
   */
  label?: string;

  /**
   * Appends a red asterisk to the label & sets the input's native `required`
   * attribute.
   */
  required?: boolean;

  /** A line under the control, for context on what the number means. */
  description?: string;
  /**
   * Height of the buttons and the input together. The icon inside the buttons
   * grows only at `lg`.
   */
  size?: Size;
  /**
   * Corner radius on the group's outer edges. `squircle` uses `corner-shape`,
   * which degrades to a rounded square where that is unsupported.
   */
  shape?: Shape;
  /**
   * Depth across the buttons and the input. `inset` reads as a well, `outset`
   * as a raised control.
   */
  shadow?: Shadow;

  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline, drawn around the input and both buttons together. `true`
   * draws it, `false` removes it, and a string of Yumma CSS utilities restyles
   * it; write them with `fw:`, since the group draws it while anything inside
   * has focus. Removing it outright and putting nothing back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * A number input with increment and decrement buttons, in three sizes, three
 * shapes and three shadows.
 */
export default function NumberFieldBase({
  label,
  required = false,
  description,
  size = "md",
  shape = "rounded",
  shadow = "none",
  disabled = false,
  className,
  focus = true,
  ...props
}: NumberFieldProps) {
  const id = useId();

  const outline = focus ? merge(GROUP_FOCUS, focus === true ? "" : focus) : "";

  const stepClasses = merge("os:none", STEP, STEP_SIZES[size]);

  const inputClasses = merge(
    "os:none bg:white bc:transparent c:slate-10 bw:1 ta:l",
    INPUT_SIZES[size],
    SHADOWS[shadow],
    className,
  );

  return (
    <NumberField.Root
      id={id}
      disabled={disabled}
      className={`d:f fd:c ai:fs g:2 ${disabled ? "o:60 c:na" : ""}`}
      {...props}
    >
      {label && (
        <NumberField.ScrubArea className="c:er">
          <label htmlFor={id} className="c:slate-10 fs:sm fw:500 c:er">
            {label}
            {required && <span className="c:red-5"> *</span>}
          </label>
        </NumberField.ScrubArea>
      )}

      <NumberField.Group
        className={merge(
          "d:f o:h bc:silver-3 bw:1",
          GROUP_SHAPES[shape],
          outline,
        )}
      >
        <NumberField.Input required={required} className={inputClasses} />
        <span className="d:f fd:c blc:silver-3 blw:1">
          <NumberField.Increment className={stepClasses}>
            <AltArrowUpIcon className={ICON_SIZES[size]} />
          </NumberField.Increment>
          <NumberField.Decrement
            className={`${stepClasses} btc:silver-3 btw:1`}
          >
            <AltArrowDownIcon className={ICON_SIZES[size]} />
          </NumberField.Decrement>
        </span>
      </NumberField.Group>

      {description && <p className="m:0 c:slate-6 fs:xs">{description}</p>}
    </NumberField.Root>
  );
}
