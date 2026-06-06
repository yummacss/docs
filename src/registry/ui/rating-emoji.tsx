"use client";

import { Toggle } from "@base-ui/react/toggle";
import { EmojiQuite, EmojiSad, EmojiSatisfied, EmojiTalkingHappy } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

const EMOJIS = [
  { icon: EmojiSad, label: "Unsatisfied", color: "c-red" },
  { icon: EmojiQuite, label: "Neutral", color: "c-yellow-5" },
  { icon: EmojiSatisfied, label: "Satisfied", color: "c-green-5" },
  { icon: EmojiTalkingHappy, label: "Delighted", color: "c-green-5" },
];

export default function RatingEmoji() {
  const [selected, setSelected] = useState(-1);

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Sprint satisfaction</span>
      <div className="d-f g-3">
        {EMOJIS.map((emoji, i) => {
          const active = i === selected;
          const Icon = emoji.icon;
          return (
            <Toggle
              key={emoji.label}
              pressed={active}
              onPressedChange={() => setSelected(i === selected ? -1 : i)}
              aria-label={emoji.label}
              className={(state) =>
                `d-f ai-c jc-c w-12 h-12 bw-0 br-md us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                  state.pressed
                    ? `bg-transparent ${emoji.color}`
                    : "bg-transparent c-slate-4 h:c-slate-6"
                }`
              }
              render={(props, state) => (
                <motion.button
                  type="button"
                  {...(props as HTMLMotionProps<"button">)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Icon className="w-7 h-7" />
                </motion.button>
              )}
            />
          );
        })}
      </div>
      <span className="c-slate-6 fs-xs">
        {selected >= 0 ? EMOJIS[selected].label : "Tap to rate"}
      </span>
    </div>
  );
}
