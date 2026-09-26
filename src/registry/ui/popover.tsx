"use client";

import { Popover } from "@base-ui/react/popover";
import { CloseIcon } from "@solar-icons/react/outline";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";
type TriggerVariant = "icon" | "label";

const POPOVER_MOTION = `
  .yui-popover-pop {
    transition: opacity 150ms ease-out, scale 150ms ease-out;
  }
  .yui-popover-pop[data-starting-style],
  .yui-popover-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-popover-pop { transition: none; }
  }
`;

const TRIGGER_VARIANTS: Record<TriggerVariant, string> = {
  icon: "w:10 h:10",
  label: "px:3 py:2 g:2",
};

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:3xl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

const ARROW_PLACEMENT: Record<string, CSSProperties> = {
  top: { bottom: -6, rotate: "180deg" },
  bottom: { top: -6 },
  left: { right: -9, rotate: "90deg" },
  right: { left: -9, rotate: "-90deg" },
  "inline-start": { right: -9, rotate: "90deg" },
  "inline-end": { left: -9, rotate: "-90deg" },
};

/** Added to `sideOffset`, so the gap is measured from the arrow's tip. */
const ARROW_HEIGHT = 6;

export interface PopoverProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * The trigger's content, an icon usually. Pair it with `triggerLabel` when
   * there is no text.
   */
  trigger: ReactNode;
  /**
   * The trigger's `aria-label`. An icon-only trigger has no accessible name
   * without it.
   */
  triggerLabel?: string;
  /**
   * `icon` is a fixed square for a glyph alone; `label` gives the trigger room
   * to pair an icon with text.
   */
  triggerVariant?: TriggerVariant;
  /** The popup's heading, wired up by Base UI's own Popover.Title. */
  title: string;
  /** The body text, wired up by Base UI's own Popover.Description. */
  description?: ReactNode;
  /**
   * Extra content below the description: a swatch grid, say. Style it yourself.
   */
  children?: ReactNode;
  /**
   * Which side of the trigger the popup opens on. It flips automatically if
   * there is no room.
   */
  side?: Side;
  /** Gap between the trigger and the popup, or its arrow tip, in pixels. */
  sideOffset?: number;
  /**
   * A pointer notched into the popup's edge, aimed back at the trigger. It
   * re-aims itself when `side` changes.
   */
  arrow?: boolean;
  /**
   * Opens on hover as well as click. Consider that a popup which opens on hover
   * is hard to reach on touch.
   */
  openOnHover?: boolean;
  /**
   * How long a hover must rest before the popup opens, in ms. Ignored unless
   * `openOnHover` is set.
   */
  delay?: number;
  /**
   * Controlled open state, for closing the popup from inside `children` - after
   * a selection, say. Uncontrolled (the default) if omitted.
   */
  open?: boolean;
  /** Called whenever the popup opens or closes, controlled or not. */
  onOpenChange?: (open: boolean) => void;
  /** An X beside the title. Clicking outside dismisses it either way. */
  showClose?: boolean;
  /** Corner radius on the trigger and the popup. */
  shape?: Shape;
  /** Depth on the popup. */
  shadow?: Shadow;
  /**
   * The popup's scale-in. Turn it off for an instant popup, or when the user
   * has asked for reduced motion.
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

/**
 * A click- or hover-triggered popup with a title and description, positionable
 * on any side, with an optional arrow and close button.
 */
export default function PopoverBase({
  trigger,
  triggerLabel,
  triggerVariant = "icon",
  title,
  description,
  children,
  side = "bottom",
  sideOffset = 8,
  arrow = true,
  openOnHover = false,
  delay = 300,
  open: controlledOpen,
  onOpenChange,
  showClose = false,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
  container,
}: PopoverProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const triggerClasses = merge(
    outline,
    "d:f ai:c jc:c bw:1 bc:silver-2 bg:white c:slate-10 us:none c:p h:bg:silver-1",
    TRIGGER_VARIANTS[triggerVariant],
    TRIGGER_SHAPES[shape],
    open ? "bg:silver-1" : "",
    className,
  );

  const popupClasses = [
    "px:4 py:3 w:56 bg:white bc:silver-2 c:slate-10 bw:1 os:none",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    arrow ? "p:r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      {arrow && (
        <Popover.Arrow
          className="d:f"
          style={(state) => ARROW_PLACEMENT[state.side]}
        >
          <svg viewBox="0 0 10 5" width="12" height="6">
            <title>Arrow</title>
            <path
              d="M0 5 L5 0 L10 5"
              strokeWidth="1"
              className="f:white s:silver-2"
            />
          </svg>
        </Popover.Arrow>
      )}

      <div className="d:f ai:s jc:sb g:3">
        <Popover.Title className="m:0 mb:1 c:slate-10 fs:sm fw:500">
          {title}
        </Popover.Title>
        {showClose && (
          <Popover.Close
            className={merge(
              outline,
              "d:f fs:0 ai:c jc:c w:7 h:7 bg:transparent c:slate-5 bw:0 br:9999 c:p h:bg:silver-1/50 h:c:slate-7",
            )}
            aria-label="Close"
          >
            <CloseIcon aria-hidden className="w:5 h:5" />
          </Popover.Close>
        )}
      </div>

      {description && (
        <Popover.Description className="m:0 c:slate-8 fs:xs">
          {description}
        </Popover.Description>
      )}

      {children}
    </>
  );

  const popup = (
    <Popover.Portal container={container} keepMounted>
      <Popover.Positioner
        side={side}
        sideOffset={sideOffset + (arrow ? ARROW_HEIGHT : 0)}
      >
        <Popover.Popup
          className={`${popupClasses} ${animated ? "yui-popover-pop" : ""}`}
        >
          {body}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-popover-motion" precedence="default">
        {POPOVER_MOTION}
      </style>

      <Popover.Trigger
        className={triggerClasses}
        aria-label={triggerLabel}
        openOnHover={openOnHover}
        delay={openOnHover ? delay : undefined}
      >
        {trigger}
      </Popover.Trigger>

      {popup}
    </Popover.Root>
  );
}
