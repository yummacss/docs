import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle" | "pill";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

// Padding for an icon-only button is the size crossed with `iconOnly`, which is
// the one thing a flat map cannot say. `merge` drops the longhands the size
// already emitted, so the compound wins without the map having to know.
const button = cva(
  "d-if ai-c jc-c g-2 bw-1 fw-500 us-none fv:os-s fv:ow-3 fv:oo-0",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-12 h:bg-slate-11 bc-slate-12 c-white fv:oc-silver-3/60 fv:bc-silver-5",
        secondary:
          "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-silver-3/60 fv:bc-silver-5",
        subtle:
          "bg-silver-1 bc-transparent c-slate-7 h:bg-silver-2 fv:oc-silver-3/60 fv:bc-silver-5",
        ghost:
          "bg-transparent bc-transparent c-slate-10 h:bg-silver-1/50 h:c-slate-7 fv:oc-silver-3/60 fv:bc-silver-5",
        danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-2/60 fv:bc-red-3",
        link: "bg-transparent bc-transparent c-slate-10 tuo-2 h:td-u fv:oc-silver-3/60 fv:bc-silver-5",
      },
      size: {
        sm: "px-2 py-1 fs-sm",
        md: "px-3 py-2 fs-md",
        lg: "px-4 py-3 fs-lg",
      },
      shape: {
        rounded: "br-lg",
        square: "br-0",
        squircle: "br-xxl cs-s",
        pill: "br-9999",
      },
      shadow: { none: "", inset: "bs-i-md", outset: "bs-o-sm" },
      transition: { true: "tp-c tdu-150 ttf-io", false: "" },
      iconOnly: { true: "", false: "" },
      inactive: { true: "o-60 c-na", false: "c-p" },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "p-1" },
      { iconOnly: true, size: "md", class: "p-2" },
      { iconOnly: true, size: "lg", class: "p-3" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "square",
      shadow: "none",
      transition: true,
      iconOnly: false,
      inactive: false,
    },
  },
);

export interface ButtonProps extends ComponentProps<typeof Button> {
  // merge composes a string, so the Base UI function form is not accepted here.
  className?: string;
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconSide;
  /** Does nothing while `icon` is not set. */
  iconOnly?: boolean;
  transition?: boolean;
  children?: ReactNode;
}

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
  children,
  ...props
}: ButtonProps) {
  const inactive = disabled || loading;
  // `iconOnly` needs an icon to be only. Without one it dropped the label and
  // put nothing in its place, so the button collapsed to an empty box. The
  // prop yields instead: no icon, no effect.
  const iconOnlyActive = iconOnly && Boolean(icon);

  const classes = merge(
    button({
      variant,
      size,
      shape,
      shadow,
      transition,
      iconOnly: iconOnlyActive,
      inactive: Boolean(inactive),
    }),
    className,
  );

  return (
    <Button
      className={classes}
      disabled={inactive}
      aria-busy={loading || undefined}
      // A label the eye cannot see still has to reach a screen reader, so a
      // string child becomes the name unless one is passed.
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
