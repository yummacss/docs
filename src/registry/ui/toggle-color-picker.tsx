"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Check } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ToggleColorPicker() {
  const [selected, setSelected] = useState(["blue"]);

  return (
    <ToggleGroup
      value={selected}
      onValueChange={setSelected}
      className="d-f g-2 p-2 bg-white br-9999 bw-1 bc-silver-2"
    >
      {colors.map((color) => (
        <Toggle
          key={color.value}
          value={color.value}
          aria-label={color.label}
          className={`d-f w-9 h-9 ai-c jc-c bw-0 br-9999 us-none c-p fv:oo-2 fv:oc-indigo-3 ${color.bgClass}`}
          render={(props, state) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {state.pressed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Check className="w-4 h-4 c-white" />
                </motion.span>
              )}
            </motion.button>
          )}
        />
      ))}
    </ToggleGroup>
  );
}

const colors = [
  { value: "red", label: "Red", bgClass: "bg-red" },
  { value: "orange", label: "Orange", bgClass: "bg-orange" },
  { value: "yellow", label: "Yellow", bgClass: "bg-yellow" },
  { value: "lime", label: "Lime", bgClass: "bg-lime" },
  { value: "green", label: "Green", bgClass: "bg-green" },
  { value: "cyan", label: "Cyan", bgClass: "bg-cyan" },
  { value: "blue", label: "Blue", bgClass: "bg-blue" },
  { value: "indigo", label: "Indigo", bgClass: "bg-indigo" },
  { value: "violet", label: "Violet", bgClass: "bg-violet" },
  { value: "coral", label: "Coral", bgClass: "bg-coral" },
];
