"use client";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

export default function RatingFeedback() {
  const [rating, setRating] = useState(0);

  return (
    <div className="d-f fd-c ai-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Rate this sprint</span>
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
                `d-f ai-c jc-c w-9 h-9 bw-0 br-lg us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                  state.pressed
                    ? "bg-transparent c-yellow-5"
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
      <div className="d-f g-2">
        <Input
          placeholder="Share your feedback..."
          className="h-9 w-44 pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-sm bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
        <Button className="d-f ai-c px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-lg bw-1 fs-sm fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5">
          Send
        </Button>
      </div>
    </div>
  );
}
