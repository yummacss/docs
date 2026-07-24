"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

export default function RatingOutset() {
  const [rating, setRating] = useState(0);

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Rate this project</span>
      <div className="d-f g-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= rating;
          return (
            <Toggle
              key={star}
              pressed={filled}
              onPressedChange={() => setRating(star === rating ? 0 : star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className={(state) =>
                `d-f ai-c jc-c w-9 h-9 br-lg bg-white bc-silver-2 bw-1 bs-o-xs us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                  state.pressed
                    ? "c-yellow-5"
                    : "c-slate-4 h:c-slate-6"
                }`
              }
              render={(props, state) => (
                <motion.button
                  type="button"
                  {...(props as HTMLMotionProps<"button">)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Star
                    className="w-6 h-6"
                    style={{ fill: state.pressed ? "currentColor" : "none" }}
                  />
                </motion.button>
              )}
            />
          );
        })}
      </div>
      <span className="c-slate-6 fs-xs">
        {rating > 0 ? `${rating} / 5` : "Click to rate"}
      </span>
    </div>
  );
}
