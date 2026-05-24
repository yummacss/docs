"use client";

import { Star } from "lucide-react";

const rating = 3;

export default function RatingStatic() {
  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Project rating</span>
      <div className="d-f g-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= rating;
          return (
            <div
              key={star}
              className={`d-f ai-c jc-c w-9 h-9 bw-0 br-md ${
                filled ? "c-yellow-5" : "c-slate-4"
              }`}
            >
              <Star
                className="w-6 h-6"
                style={{ fill: filled ? "currentColor" : "none" }}
              />
            </div>
          );
        })}
      </div>
      <span className="c-slate-6 fs-xs">{rating} / 5</span>
    </div>
  );
}
