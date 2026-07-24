"use client";

import { Field } from "@base-ui/react/field";
import { Toggle } from "@base-ui/react/toggle";
import { HalfMoon, SunLight } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ToggleHelper() {
  return (
    <Field.Root className="d-f fd-c g-1">
      <div className="d-f ai-c g-3">
        <Toggle
          aria-label="Toggle dark mode"
          className={(state) =>
            `d-f w-12 h-12 ai-c jc-c bw-1 br-9999 us-none c-p fv:oo-2 fv:oc-indigo-5 ${
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
        <Field.Label
          htmlFor="toggle-dark-mode"
          className="c-slate-10 fs-sm fw-500 us-none"
        >
          Dark mode
        </Field.Label>
      </div>
      <p className="pl-15 c-slate-6 fs-xs fw-400">
        Switch between light and dark themes.
      </p>
    </Field.Root>
  );
}
