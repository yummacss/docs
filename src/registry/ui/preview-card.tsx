"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const FOCUS = "fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-3xl",
  outset: "bs-o-sm",
};

export interface PreviewCardProps {
  container?: HTMLElement | null;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
  focus?: boolean | string;
}

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
    "d-f fd-c g-3 w-64 p-3 bg-white bc-silver-2 bw-1 c-slate-10 fs-sm",
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
      <PreviewCard.Trigger
        className={(state) =>
          merge(
            outline,
            "c-blue c-p fw-500 td-none h:td-u",
            state.open ? "td-u" : "",
            className,
          )
        }
      >
        {trigger}
      </PreviewCard.Trigger>

      <PreviewCard.Portal container={container}>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup
            render={
              animated ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              ) : undefined
            }
            className={popupClasses}
          >
            {children}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
