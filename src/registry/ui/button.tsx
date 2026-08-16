import { Button } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle" | "pill";
type Shadow = "none" | "inset" | "outset";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const BASE = "d-if ai-c jc-c g-2 bw-1 fw-500 us-none fv:oo-2";

// Split out of BASE so it can be switched off, the same `animate` prop Skeleton
// and Autocomplete carry.
const MOTION = "tp-c tdu-150 ttf-io";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white fv:oc-indigo-3",
  secondary: "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-indigo-3",
  subtle: "bg-silver-1 bc-transparent c-slate-7 h:bg-silver-2 fv:oc-indigo-3",
  ghost:
    "bg-transparent bc-transparent c-slate-10 h:bg-silver-1/50 h:c-slate-7 fv:oc-indigo-3",
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-3",
  link: "bg-transparent bc-transparent c-slate-10 tuo-2 h:td-u fv:oc-indigo-3",
};

const SIZES: Record<Size, string> = {
  sm: "px-2 py-1 fs-sm",
  md: "px-3 py-2 fs-md",
  lg: "px-4 py-3 fs-lg",
};

// An icon-only button needs equal padding on both axes, or it reads as a
// stretched rectangle around a square glyph.
const ICON_ONLY: Record<Size, string> = {
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
  pill: "br-9999",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface ButtonProps extends ComponentProps<typeof Button> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  /** Dims the button and blocks interaction while an action is in flight. */
  loading?: boolean;
  /** Square padding, for a button whose only child is an icon. */
  iconOnly?: boolean;
  /** The hover & focus transition. */
  animate?: boolean;
  children?: ReactNode;
}

export default function ButtonBase({
  variant = "primary",
  size = "md",
  shape = "rounded",
  shadow = "none",
  loading = false,
  iconOnly = false,
  animate = true,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const inactive = disabled || loading;

  const classes = [
    BASE,
    animate ? MOTION : "",
    VARIANTS[variant],
    iconOnly ? ICON_ONLY[size] : SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    inactive ? "o-60 c-na" : "c-p",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      className={classes}
      disabled={inactive}
      // To a screen reader `loading` is a busy state, not a disabled one.
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </Button>
  );
}
