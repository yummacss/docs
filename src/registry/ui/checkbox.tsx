"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "iconoir-react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const FOCUS = "fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5";

const BOX = "d-f ai-c jc-c fs-0";

const SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-sm",
  lg: "fs-md",
};

const DESCRIPTION_INDENT: Record<Size, string> = {
  sm: "ml-5",
  md: "ml-6",
  lg: "ml-7",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-sm",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const CHECKED = "bg-slate-12";
const UNCHECKED = "bw-1 bc-silver-3 bg-transparent";

const DISABLED_BOX = "bw-1 bc-silver-2 bg-silver-1";

export interface CheckboxProps
  extends Omit<ComponentProps<typeof Checkbox.Root>, "className"> {
  label?: ReactNode;

  description?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  className?: string;
  focus?: boolean | string;
}

export default function CheckboxBase({
  label,
  description,
  size = "md",
  shape = "square",
  shadow = "none",
  disabled = false,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  focus = true,
  ...props
}: CheckboxProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const checked = controlledChecked ?? internalChecked;

  const handleChange: NonNullable<CheckboxProps["onCheckedChange"]> = (
    next,
    details,
  ) => {
    setInternalChecked(next);
    onCheckedChange?.(next, details);
  };
  return (
    <label
      className={`d:f fd:c g:1 us:none ${
        disabled ? "c:slate-5 c:na" : "c:slate-10 c:p"
      }`}
    >
      <span className={`d:f ai:c g:2 fw:500 ${LABEL_SIZES[size]}`}>
        <Checkbox.Root
          disabled={disabled}
          checked={checked}
          onCheckedChange={handleChange}
          className={(state) =>
            merge(
              outline,
              BOX,
              SIZES[size],
              SHAPES[shape],
              SHADOWS[shadow],

              disabled
                ? DISABLED_BOX
                : state.checked || state.indeterminate
                  ? CHECKED
                  : UNCHECKED,
              className,
            )
          }
          {...props}
        >
          <Checkbox.Indicator
            className={`d:f ${disabled ? "c:slate-4" : "c:white"}`}
            render={(indicatorProps, state) => (
              <span {...indicatorProps}>
                {state.indeterminate ? (
                  <Minus className={ICON_SIZES[size]} />
                ) : (
                  <Check className={ICON_SIZES[size]} />
                )}
              </span>
            )}
          />
        </Checkbox.Root>
        {label}
      </span>

      {description && (
        <span className={`c:slate-6 fs:xs ${DESCRIPTION_INDENT[size]}`}>
          {description}
        </span>
      )}
    </label>
  );
}
