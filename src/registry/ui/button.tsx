import { Button } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle" | "pill";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const BASE = "d:if ai:c jc:c g:2 bw:1 fw:500 us:none";

const MOTION = "tp:c tdu:150 ttf:io";

const VARIANTS: Record<Variant, string> = {
  primary: "bg:slate-12 h:bg:slate-11 bc:slate-12 c:white",
  secondary: "bg:white bc:silver-2 c:slate-10 h:bg:silver-1/50",
  subtle: "bg:silver-1 bc:transparent c:slate-7 h:bg:silver-2",
  ghost:
    "bg:transparent bc:transparent c:slate-10 h:bg:silver-1/50 h:c:slate-7",
  danger: "bg:red h:bg:red-8 bc:red-7 c:white",
  link: "bg:transparent bc:transparent c:slate-10 tuo:2 h:td:u",
};

const VARIANT_OUTLINE: Partial<Record<Variant, string>> = {
  danger: "fv:oc:red-2/60 fv:bc:red-3",
};

const SIZES: Record<Size, string> = {
  sm: "px:2 py:1 fs:sm",
  md: "px:3 py:2 fs:md",
  lg: "px:4 py:3 fs:lg",
};

const ICON_ONLY: Record<Size, string> = {
  sm: "p:1",
  md: "p:2",
  lg: "p:3",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
  pill: "br:9999",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

export interface ButtonProps extends ComponentProps<typeof Button> {
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * Visual weight. `primary` for the main action on a view, `danger` for
   * destructive ones.
   */
  variant?: Variant;
  /** Padding and text size. */
  size?: Size;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /** Depth. `inset` reads as a pressed control, `outset` as a raised one. */
  shadow?: Shadow;
  /**
   * Dims the button and blocks interaction, while leaving it focusable:
   * `aria-busy` and `aria-disabled` rather than the native `disabled`
   * attribute, which would drop the control out of the tab order while a reader
   * is waiting on it.
   */
  loading?: boolean;
  /**
   * A glyph beside the label. Pass the icon and nothing else; the base gap
   * spaces it for you. With `iconOnly` it becomes the whole button, so give
   * that one an `aria-label`.
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconSide;
  /**
   * Drops the label and draws the icon alone, keeping the label as the
   * accessible name. Needs `icon`: without one there would be nothing left to
   * show, so the prop has no effect.
   */
  iconOnly?: boolean;
  /**
   * The hover and focus transition. Turn it off for a static button, or when
   * the user has asked for reduced motion.
   */
  transition?: boolean;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
  /** The button's label. */
  children?: ReactNode;
}

/**
 * A primary action, in six variants, three sizes and four shapes, with optional
 * shadow, loading and icon-only states.
 */
export default function ButtonBase({
  variant = "primary",
  size = "md",
  shape = "square",
  shadow = "none",
  loading = false,
  icon,
  iconPosition = "leading",
  iconOnly = false,
  transition = true,
  disabled,
  className,
  focus = true,
  children,
  ...props
}: ButtonProps) {
  const outline = focus
    ? merge(FOCUS, VARIANT_OUTLINE[variant], focus === true ? "" : focus)
    : "";

  const inactive = disabled || loading;
  const busy = loading && !disabled;
  const iconOnlyActive = iconOnly && Boolean(icon);

  const classes = merge(
    outline,
    BASE,
    transition ? MOTION : "",
    VARIANTS[variant],
    iconOnlyActive ? ICON_ONLY[size] : SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    inactive ? "o:60 c:na" : "c:p",
    className,
  );

  return (
    <Button
      className={classes}
      disabled={inactive}
      focusableWhenDisabled={busy}
      aria-busy={loading || undefined}
      aria-label={
        iconOnlyActive && typeof children === "string" ? children : undefined
      }
      {...props}
    >
      {iconOnlyActive ? (
        icon
      ) : (
        <>
          {iconPosition === "leading" && icon}
          {children}
          {iconPosition === "trailing" && icon}
        </>
      )}
    </Button>
  );
}
