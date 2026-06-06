"use client";

import { Star } from "iconoir-react";

export default function RatingReadonly() {
  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Project rating</span>
      <div className="d-f ai-c g-3">
        <span className="c-slate-10 fw-500 fs-2xl">4.2</span>
        <div className="d-f g-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${star <= 4 ? "c-yellow-5" : "c-slate-4"}`}
              style={{ fill: star <= 4 ? "currentColor" : "none" }}
            />
          ))}
        </div>
      </div>
      <span className="c-slate-6 fs-xs">Average of 24 reviews</span>
    </div>
  );
}
