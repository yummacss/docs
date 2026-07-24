"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import { useState } from "react";

export default function RatingDisabled() {
  const [rating] = useState(3);

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-4 fs-sm fw-500">Sprint satisfaction</span>
      <div className="d-f g-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= rating;
          return (
            <Toggle
              key={star}
              pressed={filled}
              disabled
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className={`d-f ai-c jc-c w-9 h-9 bw-0 br-lg us-none c-na o-60 ${
                filled
                  ? "bg-transparent c-yellow-5"
                  : "bg-transparent c-slate-4"
              }`}
            >
              <Star
                className="w-6 h-6"
                style={{ fill: filled ? "currentColor" : "none" }}
              />
            </Toggle>
          );
        })}
      </div>
      <span className="c-slate-6 fs-xs">3 / 5 stars</span>
    </div>
  );
}
