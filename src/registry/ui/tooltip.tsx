"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Tone = "light" | "dark" | "danger";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const FOCUS = "fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5";

const TOOLTIP_MOTION = `
  .yui-tooltip-pop {
    transition: opacity 150ms ease-out, translate 150ms ease-out, scale 150ms ease-out;
  }
  .yui-tooltip-pop[data-starting-style],
  .yui-tooltip-pop[data-ending-style] {
    opacity: 0;
    translate: 0 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-tooltip-pop { transition: none; }
  }
`;

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-3xl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const TONES: Record<Tone, string> = {
  light: "bg-white bc-silver-2 c-slate-10 bw-1",
  dark: "bg-slate-12 c-white",
  danger: "bg-red-7 c-white",
};

const DANGER_OUTLINE = "fv:oc-red-2/60 fv:bc-red-3";

const TRIGGER_TONES: Record<Tone, string> = {
  light: "c-slate-8 h:c-slate-10",
  dark: "c-slate-8 h:c-slate-10",
  danger: "c-red-7 h:c-red-8",
};

const ARROW_TONES: Record<Tone, string> = {
  light: "f-white s-silver-2",
  dark: "f-slate-12 s-slate-12",
  danger: "f-red-7 s-red-7",
};

const ARROW_PLACEMENT: Record<string, CSSProperties> = {
  top: { bottom: -8, rotate: "180deg" },
  bottom: { top: -8 },
  left: { right: -12, rotate: "90deg" },
  right: { left: -12, rotate: "-90deg" },
  "inline-start": { right: -12, rotate: "90deg" },
  "inline-end": { left: -12, rotate: "-90deg" },
};

export interface TooltipProps {
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerLabel?: string;
  content: ReactNode;
  side?: Side;
  sideOffset?: number;
  tone?: Tone;
  arrow?: boolean;
  delay?: number;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
  focus?: boolean | string;
}

export default function TooltipBase({
  trigger,
  triggerLabel,
  content,
  side = "top",
  sideOffset = 8,
  tone = "light",
  arrow = true,
  delay = 300,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
  container,
}: TooltipProps) {
  const outline = focus
    ? merge(
        FOCUS,
        tone === "danger" ? DANGER_OUTLINE : "",
        focus === true ? "" : focus,
      )
    : "";

  const triggerClasses = merge(
    outline,
    "d-f ai-c jc-c bg-transparent bw-0 c-p",
    TRIGGER_TONES[tone],
    className,
  );

  const popupClasses = [
    "px-3 py-2 fs-sm us-none",
    TONES[tone],
    SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    arrow ? "p-r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const arrowTone = ARROW_TONES[tone];

  const popup = (
    <Tooltip.Popup
      className={`${popupClasses} ${animated ? "yui-tooltip-pop" : ""}`}
    >
      {arrow && (
        <Tooltip.Arrow
          className="d:f w:4 h:2"
          style={(state) => ARROW_PLACEMENT[state.side]}
        >
          <svg viewBox="0 0 10 5" width="16" height="8">
            <title>Arrow</title>
            <path d="M0 5 L5 0 L10 5" strokeWidth="1" className={arrowTone} />
          </svg>
        </Tooltip.Arrow>
      )}
      {content}
    </Tooltip.Popup>
  );

  return (
    <Tooltip.Provider delay={delay}>
      <Tooltip.Root>
        <style href="yumma-ui-tooltip-motion" precedence="default">
          {TOOLTIP_MOTION}
        </style>
        <Tooltip.Trigger className={triggerClasses} aria-label={triggerLabel}>
          {trigger}
        </Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Positioner side={side} sideOffset={sideOffset}>
            {popup}
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
