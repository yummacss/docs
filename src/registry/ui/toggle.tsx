"use client";

import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";

type Shape = "rounded" | "square" | "squircle";

const SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

export interface ToggleProps
  extends Omit<ComponentProps<"button">, "className" | "value"> {
  /** Shown while not pressed. */
  icon?: ReactNode;
  /** Shown while pressed. */
  pressedIcon?: ReactNode;
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  shape?: Shape;
  /** The press-scale animation. Off for an instant toggle, or reduced motion. */
  animate?: boolean;
  className?: string;
}

export default function ToggleBase({
  icon,
  pressedIcon,
  defaultPressed,
  pressed: controlledPressed,
  onPressedChange,
  shape = "rounded",
  animate = true,
  className,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(
    defaultPressed ?? controlledPressed ?? false,
  );
  const pressed = controlledPressed ?? internalPressed;

  const handlePressedChange = (next: boolean) => {
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  return (
    <Toggle
      pressed={pressed}
      onPressedChange={handlePressedChange}
      className={(state) =>
        [
          "d-f w-12 h-12 ai-c jc-c bw-1 us-none c-p fv:oo-2 fv:oc-indigo-5",
          SHAPES[shape],
          state.pressed
            ? "bg-indigo bc-indigo-6 c-white"
            : "bg-white bc-indigo-3 c-indigo h:bg-indigo-1",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
      render={(renderProps, state) =>
        animate ? (
          <motion.button
            type="button"
            {...(renderProps as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {state.pressed ? pressedIcon : icon}
          </motion.button>
        ) : (
          <Button {...(renderProps as ComponentProps<"button">)}>
            {state.pressed ? pressedIcon : icon}
          </Button>
        )
      }
      {...props}
    />
  );
}
