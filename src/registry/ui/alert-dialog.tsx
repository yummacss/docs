"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { CloseIcon } from "@solar-icons/react/linear";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Tone = "danger" | "neutral";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "px:3 py:1 fs:xs",
  md: "px:4 py:2 fs:sm",
  lg: "px:6 py:3 fs:md",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const BADGE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const ALERT_MOTION = `
  .yui-alert-pop {
    transition: opacity 200ms ease-out, scale 200ms ease-out;
  }
  .yui-alert-pop[data-starting-style],
  .yui-alert-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  .yui-alert-fade {
    transition: opacity 200ms ease-out;
  }
  .yui-alert-fade[data-starting-style],
  .yui-alert-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-alert-pop,
    .yui-alert-fade { transition: none; }
  }
`;

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:lg cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const DANGER_OUTLINE = "fv:oc:red-2/60 fv:bc:red-3";

const TONE_BUTTON: Record<Tone, string> = {
  danger: "bg:red h:bg:red-8 bc:red-7 c:white",
  neutral: "bg:white bc:silver-2 c:slate-10 h:bg:silver-1/50",
};

const TONE_BADGE: Record<Tone, string> = {
  danger: "bg:red-1/50 c:red",
  neutral: "bg:silver-2 c:slate-7",
};

export interface AlertDialogProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The trigger button's label. */
  trigger: ReactNode;
  /** A glyph beside the trigger's label. */
  triggerIcon?: ReactNode;
  /** Which end of the trigger `triggerIcon` sits at. */
  triggerIconPosition?: IconPosition;
  /**
   * The trigger's own color, independent of the dialog's `tone` - a neutral
   * button can still open a destructive dialog.
   */
  triggerTone?: Tone;
  /** The glyph in the badge above the title. No badge renders without one. */
  icon?: ReactNode;
  /** Colors the badge and the confirm button together. */
  tone?: Tone;
  /** The dialog's heading, wired up by Base UI's own AlertDialog.Title. */
  title: string;
  /** The body text, wired up by Base UI's own AlertDialog.Description. */
  description: string;
  /** The dismissing button's label. */
  cancelLabel?: string;
  /** The confirming button's label. */
  confirmLabel: string;
  /**
   * Called when the confirm button is pressed. The dialog closes either way.
   */
  onConfirm?: () => void;
  /**
   * The X in the corner. The Cancel button remains either way, so turning this
   * off never traps anyone.
   */
  showClose?: boolean;
  /**
   * Padding and text size of the trigger and the popup's buttons, on the same
   * scale as Button, so a dialog matches the buttons beside it.
   */
  size?: Size;
  /**
   * Corner radius on the popup, the badge and the buttons. `square` squares off
   * the badge too.
   */
  shape?: Shape;
  /** Depth on the popup. */
  shadow?: Shadow;
  /**
   * The backdrop's fade and the popup's scale-in. Turn it off for an instant
   * dialog, or when the user has asked for reduced motion.
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
 * A confirmation dialog with a badge, title, description and a cancel/confirm
 * pair, in two tones.
 */
export default function AlertDialogBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  triggerTone = "danger",
  icon,
  tone = "danger",
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  showClose = true,
  size = "md",
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
  container,
}: AlertDialogProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const triggerOutline =
    focus && triggerTone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;
  const confirmOutline =
    focus && tone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const base = `${SIZES[size]} bw:1 fw:500 tp:c tdu:150 ttf:io us:none`;

  const triggerClasses = merge(
    triggerOutline,
    "d:if ai:c g:2",
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON[triggerTone],
    className,
  );

  const popupClasses = [
    "o:h p:r w:96 bg:white bc:silver-2 c:slate-10 bw:1 os:none",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const badgeClasses = [
    "d:f ai:c jc:c w:12 h:12",
    TONE_BADGE[tone],
    BADGE_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const cancelClasses = merge(
    outline,
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON.neutral,
  );

  const confirmClasses = merge(
    confirmOutline,
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON[tone],
  );

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:black/5 bf-b:xs ${
          animated ? "yui-alert-fade" : ""
        }`}
      />
      <AlertDialog.Viewport className="d:f p:f i:0 ai:c jc:c">
        <AlertDialog.Popup
          ref={popupRef}
          initialFocus={(type) => type === "keyboard" || popupRef.current}
          className={`${popupClasses} ${animated ? "yui-alert-pop" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <AlertDialog.Close
              render={
                <Button
                  className={merge(
                    outline,
                    "d:f p:a r:3 t:3 ai:c jc:c w:7 h:7 p:0 c:slate-6 bw:0 h:bg:silver-1/50 h:c:slate-7",
                    CLOSE_SHAPES[shape],
                  )}
                />
              }
              aria-label="Close"
            >
              <CloseIcon aria-hidden className="w:5 h:5" />
            </AlertDialog.Close>
          )}

          <div className="d:f fd:c ai:c g:3 pt:10 pb:6 px:4">
            {icon && <span className={badgeClasses}>{icon}</span>}
            <AlertDialog.Title className="c:slate-10 fs:md fw:500">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="m:0 c:slate-6 fs:sm lh:4 ta:c">
              {description}
            </AlertDialog.Description>
          </div>

          <div className="d:f jc:c g:3 px:4 pb:4">
            <AlertDialog.Close render={<Button className={cancelClasses} />}>
              {cancelLabel}
            </AlertDialog.Close>
            <AlertDialog.Close
              render={<Button className={confirmClasses} />}
              onClick={onConfirm}
            >
              {confirmLabel}
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Viewport>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-alert-dialog-motion" precedence="default">
        {ALERT_MOTION}
      </style>
      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
