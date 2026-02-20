"use client";

import { Toggle } from "@base-ui/react/toggle";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExampleToggle() {
  return (
    <Toggle
      aria-label="Play or pause"
      className={(state) =>
        `d-f w-12 h-12 ai-c jc-c bw-1 br-pill us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
          state.pressed
            ? "bg-indigo bc-indigo-6 c-white"
            : "bg-white bc-silver-3 c-indigo h:bg-silver-1"
        }`
      }
      render={(props, state) => (
        <motion.button
          type="button"
          {...(props as any)}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 800, damping: 35 }}
        >
          {state.pressed ? (
            <PauseIcon size={24} weight="fill" />
          ) : (
            <PlayIcon size={24} weight="fill" />
          )}
        </motion.button>
      )}
    />
  );
}
