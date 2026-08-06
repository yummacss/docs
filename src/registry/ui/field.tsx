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
  disabled,
  required,
  className,
  ...props
}: FieldProps) {
  const status: Status = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? description;
  const showDecorativeIcon = Boolean(icon) && status === "default";
  const activeSide: IconSide = status === "default" ? iconSide : "trailing";

  const controlClasses = [
    "bg-white c-slate-10 bw-1 fs-md fv:oo--1",
    SIZES[size],
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

      <div className="d-f p-r ai-c">
        {showDecorativeIcon && (
          <span
            className={`d-f p-a ai-c c-slate-5 pe-none ${iconSide === "leading" ? "l-3" : "r-3"}`}
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

      {message && (
        <Field.Description className={`fs-xs ${STATUS_MESSAGE[status]}`}>
          {message}
        </Field.Description>
      )}
    </Field.Root>
  );
}
