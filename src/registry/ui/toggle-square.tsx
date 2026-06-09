"use client";

import { Toggle } from "@base-ui/react/toggle";
import { HalfMoon, SunLight } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ToggleSquare() {
  return (
    <Toggle
      aria-label="Toggle theme"
      className={(state) =>
        `d-f w-12 h-12 ai-c jc-c bw-1 us-none c-p fv:oo-2 fv:oc-indigo-5 ${
          state.pressed
            ? "bg-indigo bc-indigo-6 c-white"
            : "bg-white bc-indigo-3 c-indigo h:bg-indigo-1"
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
            <HalfMoon className="w-5 h-5" />
          ) : (
            <SunLight className="w-5 h-5" />
          )}
        </motion.button>
      )}
    />
  );
}
