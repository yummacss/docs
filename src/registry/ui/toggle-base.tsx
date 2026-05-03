"use client";

import { Toggle } from "@base-ui/react/toggle";
import { PauseFill, PlayFill } from "@gravity-ui/icons";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ToggleBase() {
  return (
    <Toggle
      aria-label="Play or pause"
      className={(state) =>
        `d-f w-12 h-12 ai-c jc-c bw-1 br-pill us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
          state.pressed
            ? "bg-indigo bc-indigo-6 c-white"
            : "bg-white bc-silver-3 c-indigo h:bg-silver-1"
        }`
      }
      render={(props, state) => (
        <motion.button
          type="button"
          {...(props as HTMLMotionProps<"button">)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {state.pressed ? (
            <PauseFill className="w-5 h-5" />
          ) : (
            <PlayFill className="w-5 h-5" />
          )}
        </motion.button>
      )}
    />
  );
}
