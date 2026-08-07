"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { ArrowLeft, ArrowRight, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";

type Indicator = "count" | "progress";
type IconPosition = "leading" | "trailing";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const CONTROL_BASE =
  "d-f ai-c jc-c w-8 h-8 bw-1 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5";

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

export interface OnboardingStep {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface OnboardingProps {
  /** The trigger button's label. */
  trigger: ReactNode;
  /** A glyph beside the trigger's label. */
  triggerIcon?: ReactNode;
  /** Which end of the trigger its `triggerIcon` sits at. */
  iconPosition?: IconPosition;
  steps: OnboardingStep[];
  /** `count` reads "1 / 3"; `progress` draws a filling bar under the slide. */
  indicator?: Indicator;
  /** An X in the corner, so the tour can be skipped. */
  dismissible?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  /** The slide transition and the popup's scale-in. */
  animate?: boolean;
  className?: string;
}

export default function OnboardingBase({
  trigger,
  triggerIcon,
  iconPosition = "leading",
  steps,
  indicator = "count",
  dismissible = false,
  shape = "rounded",
  shadow = "none",
  animate = true,
  className,
}: OnboardingProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const step = steps[page];
  const isFirst = page === 0;
  const isLast = page === steps.length - 1;

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const triggerClasses = [
    "bg-white d-if ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5",
    CONTROL_SHAPES[shape],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const popupClasses = [
    "o-h p-r w-96 bg-white bc-silver-2 c-slate-12 bw-1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backClasses = [
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50",
  ].join(" ");

  const forwardClasses = [
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white",
  ].join(" ");

  const slide = (
    <div className="d-f fd-c ai-c g-3">
      <div className="d-ib p-r">
        <div className="p-a l--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro--3 tty-1" />
        <div className="p-a r--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro-3 tty-1" />
        <div className="d-f p-r ai-c jc-c h-14 w-14 bg-white bc-silver-2 bw-1 br-xl">
          {step.icon}
        </div>
      </div>
      <span className="c-slate-10 fs-md fw-500">{step.title}</span>
      <p className="m-0 c-slate-6 fs-sm lh-4">{step.description}</p>
    </div>
  );

  const popup = (
    <AlertDialog.Portal keepMounted>
      <AlertDialog.Backdrop
        render={
          animate ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          ) : undefined
        }
        className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
      />
      <div className="d-f p-f i-0 ai-c jc-c">
        <AlertDialog.Popup
          render={
            animate ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            ) : undefined
          }
          className={popupClasses}
          style={{ maxWidth: "90vw" }}
        >
          {dismissible && (
            <AlertDialog.Close
              render={
                <Button className="d-f p-a l-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
              }
              aria-label="Skip"
            >
              <Xmark aria-hidden className="w-4 h-4" />
            </AlertDialog.Close>
          )}

          <div className="d-f ai-c jc-sb px-8 pt-5">
            <span className="c-slate-5 fs-xs">
              {indicator === "count" ? `${page + 1} / ${steps.length}` : ""}
            </span>
            <div className="d-f g-2">
              {!isFirst && (
                <Button onClick={() => go(page - 1)} className={backClasses}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              {isLast ? (
                <AlertDialog.Close
                  render={<Button className={forwardClasses} />}
                >
                  <Check className="w-4 h-4" />
                </AlertDialog.Close>
              ) : (
                <Button onClick={() => go(page + 1)} className={forwardClasses}>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-8 pt-4 pb-10">
            <div className="d-f o-h fd-c ai-c jc-c h-48 ta-c">
              {animate ? (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="d-f fd-c ai-c g-3"
                  >
                    {slide}
                  </motion.div>
                </AnimatePresence>
              ) : (
                slide
              )}
            </div>
          </div>

          {indicator === "progress" && (
            <div className="d-f jc-c pb-6">
              <div className="p-r o-h w-32 h-1 bg-silver-2 br-9999">
                <motion.div
                  className="p-a l-0 t-0 h-100% bg-indigo br-9999"
                  initial={false}
                  animate={{
                    width: `${((page + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </AlertDialog.Popup>
      </div>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setPage(0);
          setDirection(0);
        }
      }}
    >
      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && iconPosition === "leading" && triggerIcon}
        <span>{trigger}</span>
        {triggerIcon && iconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {animate ? (
        <AnimatePresence>{open && popup}</AnimatePresence>
      ) : (
        open && popup
      )}
    </AlertDialog.Root>
  );
}
