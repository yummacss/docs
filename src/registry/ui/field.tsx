"use client";

import { Field } from "@base-ui/react/field";
import { Check, WarningTriangle } from "iconoir-react";
import type { ComponentProps, ReactNode } from "react";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";
type Status = "default" | "error" | "success";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const SIZES: Record<Size, string> = {
  sm: "h-8 w-56",
  md: "h-10 w-64",
  lg: "h-12 w-72",
};

// `prefixNode`/`suffix` need the control's height without its width, since the
// affix box takes its own share of the row instead.
const HEIGHTS: Record<Size, string> = { sm: "h-8", md: "h-10", lg: "h-12" };

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

// An icon sits over the control, so the text has to start after it. The status
// icon always claims the trailing slot - a decorative icon placed there too
// would collide with it, which is why `icon` is hidden once `error` or
// `success` is set.
const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl-10 pr-4",
  trailing: "pl-4 pr-10",
};

const STATUS_BORDER: Record<Status, string> = {
  default: "bc-silver-3",
  error: "bc-red-5",
  success: "bc-green-5",
};

const STATUS_RING: Record<Status, string> = {
  default: "fv:oc-indigo-5",
  error: "fv:oc-red-5",
  success: "fv:oc-green-5",
};

// The icon and the message read at different weights: the icon is the accent
// colour, the message text is one step darker so a paragraph of it stays legible.
const STATUS_ICON: Record<Status, string> = {
  default: "",
  error: "c-red-5",
  success: "c-green-5",
};

const STATUS_MESSAGE: Record<Status, string> = {
  default: "c-slate-6",
  error: "c-red-5",
  success: "c-green-6",
};

export interface FieldProps
  extends Omit<ComponentProps<typeof Field.Control>, "size"> {
  label?: string;
  /** A line under the control, for format or context. */
  description?: string;
  /**
   * Red border, a warning icon & this message in place of `description`.
   * Wins over `success` if both are set.
   */
  error?: string;
  /** Green border, a check icon & this message in place of `description`. */
  success?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  /**
   * Any icon; it is positioned for you. Hidden once `error` or `success` is
   * set, which claim the trailing slot for their own icon.
   */
  icon?: ReactNode;
  iconSide?: IconSide;
  /** Lets `icon` receive pointer events, for an inline button (a clear or reveal toggle) instead of a decorative glyph. */
  iconInteractive?: boolean;
  /** Static content flush against the control's leading edge, like a URL scheme. Mutually exclusive with `icon`/`suffix` in practice - each claims the same row. */
  prefixNode?: ReactNode;
  /** Static content flush against the control's trailing edge, like a domain suffix. */
  suffix?: ReactNode;
  /** Renders a `<textarea>` instead of an `<input>`, for a message or description field. Ignored alongside `icon`/`prefixNode`/`suffix`. */
  multiline?: boolean;
  /** Fills the width of the parent instead of `size`'s fixed width, for a field inside a form column that isn't a fixed size itself - a dialog, say. */
  fullWidth?: boolean;
}

export default function FieldBase({
  label,
  description,
  error,
  success,
  size = "md",
  shape = "rounded",
  shadow = "none",
  icon,
  iconSide = "leading",
  iconInteractive = false,
  prefixNode,
  suffix,
  multiline = false,
  fullWidth = false,
  disabled,
  required,
  className,
  ...props
}: FieldProps) {
  const status: Status = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? description;
  const showDecorativeIcon = Boolean(icon) && status === "default";
  const activeSide: IconSide = status === "default" ? iconSide : "trailing";
  const hasAffix = Boolean(prefixNode) || Boolean(suffix);

  const controlClasses = [
    "bg-white c-slate-10 bw-1 fs-md fv:oo--1",
    fullWidth ? `${HEIGHTS[size]} w-100%` : SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    STATUS_BORDER[status],
    STATUS_RING[status],
    showDecorativeIcon || status !== "default"
      ? ICON_PADDING[activeSide]
      : "pl-4 pr-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Flush against `prefixNode`/`suffix`: only the outer edge rounds, and the
  // shared seam carries no border of its own so the two segments read as one
  // control rather than two boxes glued together.
  const affixControlClasses = [
    "fg-1 bg-white bc-silver-3 c-slate-10 byw-1 fs-md fv:oo--1",
    HEIGHTS[size],
    STATUS_RING[status],
    prefixNode && suffix
      ? "pl-3 pr-3"
      : prefixNode
        ? "pl-3 pr-4 brr-lg brw-1"
        : "pl-4 pr-3 blr-lg blw-1",
  ]
    .filter(Boolean)
    .join(" ");

  const affixBoxClasses =
    "d-f ai-c jc-c px-3 bg-white bc-silver-3 c-slate-6 byw-1 fs-md";

  const multilineClasses = [
    "h-20 w-100% pt-3 pl-4 pr-4 r-none bg-white c-slate-10 bw-1 fs-md fv:oo--1",
    SHAPES[shape],
    SHADOWS[shadow],
    STATUS_BORDER[status],
    STATUS_RING[status],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Field.Root
      disabled={disabled}
      className={`d-f fd-c g-2 c-slate-10 fs-sm ${disabled ? "o-60 c-na" : ""}`}
    >
      {label && (
        <Field.Label className="fw-500">
          {label}
          {required && <span className="c-red-5"> *</span>}
        </Field.Label>
      )}

      {multiline ? (
        <Field.Control
          render={<textarea />}
          required={required}
          className={multilineClasses}
          {...props}
        />
      ) : hasAffix ? (
        <div className="d-f ai-c">
          {prefixNode && (
            <div className={`${affixBoxClasses} blr-lg blw-1`}>
              {prefixNode}
            </div>
          )}
          <Field.Control
            required={required}
            className={affixControlClasses}
            {...props}
          />
          {suffix && (
            <div className={`${affixBoxClasses} brr-lg brw-1`}>{suffix}</div>
          )}
        </div>
      ) : (
        <div className="d-f p-r ai-c">
          {showDecorativeIcon && (
            <span
              className={`d-f p-a ai-c c-slate-5 ${iconInteractive ? "" : "pe-none"} ${iconSide === "leading" ? "l-3" : "r-3"}`}
            >
              {icon}
            </span>
          )}
          <Field.Control
            required={required}
            className={controlClasses}
            {...props}
          />
          {status !== "default" && (
            <span className={`d-f p-a r-3 ai-c pe-none ${STATUS_ICON[status]}`}>
              {status === "error" ? (
                <WarningTriangle className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </span>
          )}
        </div>
      )}

      {message && (
        <Field.Description className={`fs-xs ${STATUS_MESSAGE[status]}`}>
          {message}
        </Field.Description>
      )}
    </Field.Root>
  );
}
