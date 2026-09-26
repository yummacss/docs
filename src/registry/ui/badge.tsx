import { Button } from "@base-ui/react";
import { CloseIcon } from "@solar-icons/react/linear";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Tone = "outline" | "subtle" | "solid";
type Shape = "square" | "rounded" | "pill" | "squircle";
type Size = "sm" | "md" | "lg";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const SHAPES: Record<Shape, string> = {
  square: "",
  rounded: "br:sm",
  pill: "br:9999",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:md",
  outset: "bs-o:sm",
};

const SIZES: Record<Size, { pad: string; text: string; icon: string }> = {
  sm: { pad: "px:2 py:0", text: "fs:xs", icon: "w:3 h:3" },
  md: { pad: "px:2 py:1", text: "fs:xs", icon: "w:3 h:3" },
  lg: { pad: "px:3 py:1", text: "fs:md", icon: "w:4 h:4" },
};

interface ColorSet {
  subtleBg: string;
  subtleText: string;
  subtleHover: string;
  solidBg: string;
  solidText: string;
  solidHover: string;
  dotOutline: string;
  dotSubtle: string;
}

const INTENTS = {
  neutral: {
    subtleBg: "bg:slate-1",
    subtleText: "c:slate-7",
    subtleHover: "h:bg:slate-2",
    solidBg: "bg:slate",
    solidText: "c:slate",
    solidHover: "h:bg:slate-8",
    dotOutline: "bg:slate-5",
    dotSubtle: "bg:slate-7",
  },
  info: {
    subtleBg: "bg:blue-1",
    subtleText: "c:blue-7",
    subtleHover: "h:bg:blue-2",
    solidBg: "bg:blue",
    solidText: "c:blue",
    solidHover: "h:bg:blue-8",
    dotOutline: "bg:blue-5",
    dotSubtle: "bg:blue-7",
  },
  success: {
    subtleBg: "bg:green-1",
    subtleText: "c:green-7",
    subtleHover: "h:bg:green-2",
    solidBg: "bg:green",
    solidText: "c:green",
    solidHover: "h:bg:green-8",
    dotOutline: "bg:green-5",
    dotSubtle: "bg:green-7",
  },
  warning: {
    subtleBg: "bg:orange-1",
    subtleText: "c:orange-7",
    subtleHover: "h:bg:orange-2",
    solidBg: "bg:orange",
    solidText: "c:orange",
    solidHover: "h:bg:orange-8",
    dotOutline: "bg:orange-5",
    dotSubtle: "bg:orange-7",
  },
  danger: {
    subtleBg: "bg:red-1",
    subtleText: "c:red-7",
    subtleHover: "h:bg:red-2",
    solidBg: "bg:red",
    solidText: "c:red",
    solidHover: "h:bg:red-8",
    dotOutline: "bg:red-5",
    dotSubtle: "bg:red-7",
  },
} satisfies Record<string, ColorSet>;

type Intent = keyof typeof INTENTS;

export interface BadgeProps {
  /** The badge's label. */
  children: ReactNode;
  /**
   * `outline` is a neutral bordered badge regardless of `color`. `subtle` and
   * `solid` tint every part of the badge, including the dot, count and close
   * button, to `color`.
   */
  tone?: Tone;
  /**
   * What the badge means, not which hue it is. `tone` decides the look;
   * `intent` tints it, including the dot, count and close button. `outline`
   * stays neutral regardless.
   */
  intent?: Intent;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /** Padding, text size and icon size together. */
  size?: Size;
  /** Depth on the badge. `inset` reads as a well, `outset` as a raised chip. */
  shadow?: Shadow;
  /**
   * Any icon. The slot is sized to the badge and the color is inherited, but a
   * glyph that carries its own width and height keeps them, so pass it at the
   * badge's icon size (`w-3 h-3` on `sm` and `md`, `w-4 h-4` on `lg`).
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconPosition;
  /**
   * A small leading status indicator, tinted to `color`. Typically used alone,
   * without `icon`.
   */
  dot?: boolean;
  /**
   * A trailing numeric badge. Reads as attention-red on `outline` regardless of
   * `color`, since a notification count usually means the same thing no matter
   * the parent badge's own theme.
   */
  count?: string | number;
  /**
   * Renders a trailing close button & calls this when it is pressed. The badge
   * itself does not track dismissed state, so remove it from whatever list
   * renders it.
   */
  onClose?: () => void;
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
}

/**
 * A small status label, in three tones, six colors, four shapes and three
 * sizes, with an optional dot, icon, count or close button.
 */
export default function BadgeBase({
  children,
  tone = "outline",
  intent = "neutral",
  shape = "square",
  size = "md",
  shadow = "none",
  icon,
  iconPosition = "leading",
  dot = false,
  count,
  onClose,
  className,
  focus = true,
}: BadgeProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const { pad, text, icon: iconSize } = SIZES[size];

  const badgeClasses = merge(
    "d:if ai:c g:1",
    pad,
    SHAPES[shape],
    shadow !== "none" ? SHADOWS[shadow] : "",
    tone === "outline"
      ? "bg:white bc:silver-2 bw:1"
      : tone === "subtle"
        ? [INTENTS[intent].subtleBg, "bw:0"].join(" ")
        : [INTENTS[intent].solidBg, "bw:0"].join(" "),
    className,
  );

  const contentColor =
    tone === "outline"
      ? "c:slate-10"
      : tone === "subtle"
        ? INTENTS[intent].subtleText
        : "c:white";

  const textClasses = [text, "fw:500 us:none", contentColor]
    .filter(Boolean)
    .join(" ");

  const iconClasses = ["d:if ai:c jc:c fs:0", iconSize, contentColor]
    .filter(Boolean)
    .join(" ");

  const dotClasses = [
    "w:2 h:2 br:9999",
    tone === "outline"
      ? INTENTS[intent].dotOutline
      : tone === "subtle"
        ? INTENTS[intent].dotSubtle
        : "bg:white",
  ]
    .filter(Boolean)
    .join(" ");

  const countClasses = [
    "d:if ai:c jc:c w:4 h:4 br:9999 fs:xs fw:500",
    tone === "outline"
      ? "bg:red c:white"
      : tone === "subtle"
        ? [INTENTS[intent].solidBg, "c:white"].join(" ")
        : ["bg:white", INTENTS[intent].solidText].join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  const closeButtonClasses = merge(
    outline,
    "d:f ai:c jc:c w:4 h:4 p:0 bg:transparent br:9999",
    contentColor,
    tone === "outline"
      ? "h:bg:silver-2"
      : tone === "subtle"
        ? INTENTS[intent].subtleHover
        : INTENTS[intent].solidHover,
  );

  return (
    <span className={badgeClasses}>
      {dot && <span className={dotClasses} />}
      {icon && iconPosition === "leading" && (
        <span className={iconClasses}>{icon}</span>
      )}
      <span className={textClasses}>{children}</span>
      {icon && iconPosition === "trailing" && (
        <span className={iconClasses}>{icon}</span>
      )}
      {count !== undefined && <span className={countClasses}>{count}</span>}
      {onClose && (
        <Button type="button" onClick={onClose} className={closeButtonClasses}>
          <CloseIcon className={iconSize} />
        </Button>
      )}
    </span>
  );
}
