import { Button } from "@base-ui/react/button";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type IconTone = "accent" | "neutral";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const BADGE_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

const ICON_TONES: Record<IconTone, string> = {
  accent: "c:slate-12",
  neutral: "c:slate-5",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const BUTTON_BASE =
  "d:if ai:c px:3 py:2 bw:1 fw:500 tp:c tdu:150 ttf:io us:none c:p";

export interface EmptyStateProps {
  /** The glyph in the badge. No badge renders without one. */
  icon?: ReactNode;
  /**
   * `accent` for an invitation to act, `neutral` for a plain absence: nothing
   * found, nothing to do.
   */
  iconTone?: IconTone;
  /** The heading. */
  title: string;
  /** A line under the title. */
  description?: string;
  /** The filled button. Omit it for a state with nothing to do. */
  primaryLabel?: string;
  /** A glyph before the primary label. */
  primaryIcon?: ReactNode;
  /** Called when the primary button is pressed. */
  onPrimary?: () => void;
  /** The outlined button beside the primary one. */
  secondaryLabel?: string;
  /** Called when the secondary button is pressed. */
  onSecondary?: () => void;
  /** Corner radius on the badge. */
  iconShape?: Shape;
  /**
   * Wraps the whole block in a card. `none` renders it bare, with no card at
   * all.
   */
  shadow?: Shadow;
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
 * A placeholder for an empty list, with an optional badge icon and up to two
 * actions.
 */
export default function EmptyStateBase({
  icon,
  iconTone = "accent",
  title,
  description,
  primaryLabel,
  primaryIcon,
  onPrimary,
  secondaryLabel,
  onSecondary,
  iconShape = "square",
  shadow = "none",
  className,
  focus = true,
}: EmptyStateProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const isCard = shadow !== "none";
  const hasActions = Boolean(primaryLabel || secondaryLabel);

  const gap = icon || hasActions ? "g:4" : "g:1";

  const rootClasses = merge(
    "d:f fd:c ai:c jc:c p:8",
    gap,
    isCard ? "bg:white bc:silver-2 bw:1" : "",
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    className,
  );

  const badgeClasses = [
    "d:f ai:c jc:c w:10 h:10 bg:white bc:silver-3 bw:1",
    ICON_TONES[iconTone],
    BADGE_SHAPES[iconShape],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {icon && <div className={badgeClasses}>{icon}</div>}

      <div className="d:f fd:c ai:c g:1 ta:c">
        <span className="c:slate-10 fs:md fw:500">{title}</span>
        {description && <span className="c:slate-6 fs:sm">{description}</span>}
      </div>

      {hasActions && (
        <div className="d:f g:3">
          {secondaryLabel && (
            <Button
              onClick={onSecondary}
              className={merge(
                outline,
                BUTTON_BASE,
                "bg:white bc:silver-2 c:slate-10 h:bg:silver-1/50",
              )}
            >
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button
              onClick={onPrimary}
              className={merge(
                outline,
                BUTTON_BASE,
                "g:2 bg:slate-12 h:bg:slate-11 bc:slate-12 c:white",
              )}
            >
              {primaryIcon}
              {primaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
