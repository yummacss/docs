import { Checkbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "iconoir-react";
import type { ComponentProps } from "react";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const BOX = "d-f ai-c jc-c fs-0 fv:oo-2 fv:oc-indigo-5";

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

// The description lines up with the label, not the box, so it has to clear the
// box plus the gap: 0.75/1/1.25rem of box and 0.5rem of gap.
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
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const CHECKED = "bg-indigo";
const UNCHECKED = "bw-1 bc-silver-3 bg-transparent";

export interface CheckboxProps
  extends Omit<ComponentProps<typeof Checkbox.Root>, "className"> {
  label?: string;
  /** A second line under the label, for the consequence of ticking it. */
  description?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  className?: string;
}

export default function CheckboxBase({
  label,
  description,
  size = "md",
  shape = "rounded",
  shadow = "none",
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`d-f fd-c g-1 c-slate-10 us-none ${
        disabled ? "o-60 c-na" : "c-p"
      }`}
    >
      <span className={`d-f ai-c g-2 fw-500 ${LABEL_SIZES[size]}`}>
        <Checkbox.Root
          disabled={disabled}
          className={(state) =>
            [
              BOX,
              SIZES[size],
              SHAPES[shape],
              SHADOWS[shadow],
              // Indeterminate is a filled box too: an empty one would read as
              // "off", which is the one thing it does not mean.
              state.checked || state.indeterminate ? CHECKED : UNCHECKED,
              className,
            ]
              .filter(Boolean)
              .join(" ")
          }
          {...props}
        >
          <Checkbox.Indicator
            className="d-f c-white"
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
        <span className={`c-slate-6 fs-xs ${DESCRIPTION_INDENT[size]}`}>
          {description}
        </span>
      )}
    </label>
  );
}
