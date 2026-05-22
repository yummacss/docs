"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingBase() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Rate this project</span>
      <div className="d-f g-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hover || value);
          return (
            <button
              key={star}
              type="button"
              onClick={() => setValue(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="d-f ai-c jc-c w-9 h-9 bw-0 bg-transparent br-md us-none c-p fv:oo--1 fv:oc-indigo-5"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`w-6 h-6 ${
                  filled ? "c-yellow-5" : "c-slate-4"
                }`}
                {...(filled ? { fill: "currentColor" } : {})}
              />
            </button>
          );
        })}
      </div>
      <span className="c-slate-6 fs-xs">
        {value > 0 ? `${value} / 5` : "Click to rate"}
      </span>
    </div>
  );
}
