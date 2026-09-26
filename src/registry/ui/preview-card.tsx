"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const PREVIEW_CARD_MOTION = `
  .yui-preview-card-fade {
    transition: opacity 150ms ease-out;
  }
  .yui-preview-card-fade[data-starting-style],
  .yui-preview-card-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-preview-card-fade { transition: none; }
  }
`;

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface PreviewCardProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The inline content that opens the card on hover or focus. */
  trigger: ReactNode;
  /** The card's contents. */
  children: ReactNode;
  /**
   * Starting state when you are not controlling it. Pair `open` with
   * `onOpenChange` instead if you are.
   */
  defaultOpen?: boolean;
  /** Controlled state. */
  open?: boolean;
  /** Called with the new state. Required for a controlled preview card. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Corner radius on the card. `squircle` uses `corner-shape`, which degrades
   * to a rounded square where that is unsupported.
   */
  shape?: Shape;
  /**
   * Depth on the card. `inset` reads as a well, `outset` as a raised control.
   */
  shadow?: Shadow;
  /**
   * The card's fade in/out. Turn it off for an instant appearance, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
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

/** A hover-triggered card, in three shapes with an optional shadow. */
export default function PreviewCardBase({
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
  container,
}: PreviewCardProps) {
  const popupClasses = [
    "d:f fd:c g:3 w:64 p:3 bg:white bc:silver-2 bw:1 c:slate-10 fs:sm",
    SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  return (
    <PreviewCard.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <style href="yumma-ui-preview-card-motion" precedence="default">
        {PREVIEW_CARD_MOTION}
      </style>
      <PreviewCard.Trigger
        className={(state) =>
          merge(
            outline,
            "c:blue c:p fw:500 td:none h:td:u",
            state.open ? "td:u" : "",
            className,
          )
        }
      >
        {trigger}
      </PreviewCard.Trigger>

      <PreviewCard.Portal container={container}>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup
            className={`${popupClasses} ${animated ? "yui-preview-card-fade" : ""}`}
          >
            {children}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
