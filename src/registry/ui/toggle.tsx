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
  icon?: ReactNode;

  pressedIcon?: ReactNode;
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  shape?: Shape;
  size?: Size;

  disabled?: boolean;
  animated?: boolean;
  className?: string;
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
