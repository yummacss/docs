"use client";

import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Size = "sm" | "md";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const SIZES: Record<Size, string> = {
  sm: "w:9 h:9",
  md: "w:12 h:12",
};

const DISABLED = "bw:1 bc:silver-2 bg:silver-1 c:slate-4";

const PRESSED = "bg:slate-12 bc:slate-12 c:white";
const UNPRESSED = "bg:white bc:silver-5 c:slate-12 h:bg:silver-1";

export interface ToggleProps
  extends Omit<ComponentProps<"button">, "className" | "value">,
    Pick<ComponentProps<typeof Toggle>, "value"> {
  /** Shown while not pressed. */
  icon?: ReactNode;

  /** Shown while pressed. */
  pressedIcon?: ReactNode;
  /**
   * Starting state when you are not controlling it. Pair `pressed` with
   * `onPressedChange` instead if you are.
   */
  defaultPressed?: boolean;
  /** Controlled state. */
  pressed?: boolean;
  /** Called with the new state. Required for a controlled toggle. */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /** The button's footprint. */
  size?: Size;

  /**
   * Blocks the press and marks the control. The pressed state stays legible, so
   * a disabled toggle still reports its value.
   */
  disabled?: boolean;
  /**
   * The press-scale animation. Turn it off for an instant press, or when the
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

function Pop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      key={on ? "on" : "off"}
      className="d:f"
      initial={{ scale: on ? 0.8 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

/**
 * A two-state icon button, in three shapes, with an optional press animation.
 */
export default function ToggleBase({
  icon,
  pressedIcon,
  defaultPressed,
  pressed: controlledPressed,
  onPressedChange,
  shape = "square",
  size = "md",
  disabled = false,
  animated = true,
  className,
  focus = true,
  value,
  ...props
}: ToggleProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const grouped = value !== undefined;
  const [internalPressed, setInternalPressed] = useState(
    defaultPressed ?? false,
  );
  const pressed = controlledPressed ?? internalPressed;

  const handlePressedChange = (next: boolean) => {
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  const pressedProps = grouped
    ? {}
    : { pressed, onPressedChange: handlePressedChange, defaultPressed };

  return (
    <Toggle
      value={value}
      disabled={disabled}
      {...pressedProps}
      className={(state) =>
        merge(
          outline,
          "d:f ai:c jc:c us:none",
          disabled ? "c:na" : "c:p",
          SIZES[size],
          SHAPES[shape],
          disabled ? DISABLED : `bw:1 ${state.pressed ? PRESSED : UNPRESSED}`,
          className,
        )
      }
      render={(renderProps, state) =>
        animated ? (
          <motion.button
            type="button"
            {...(renderProps as HTMLMotionProps<"button">)}
            whileTap={disabled ? undefined : { scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Pop on={state.pressed}>
              {(state.pressed && pressedIcon) || icon}
            </Pop>
          </motion.button>
        ) : (
          <Button {...(renderProps as ComponentProps<"button">)}>
            {(state.pressed && pressedIcon) || icon}
          </Button>
        )
      }
      {...props}
    />
  );
}
