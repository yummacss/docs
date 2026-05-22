"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingBase() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8 h-56">
      <span className="c-slate-10 fs-sm fw-500">Rate this project</span>
      <ToggleGroup
        value={value}
        onValueChange={setValue}
        className="d-f g-1"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const pressed = value.includes(star.toString());
          return (
            <Toggle
              key={star}
              value={star.toString()}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className={`d-f ai-c jc-c w-9 h-9 bw-0 br-md us-none c-p fv:oo--1 fv:oc-indigo-5 ${
                pressed
                  ? "bg-transparent c-yellow-5"
                  : "bg-transparent c-slate-4 h:c-slate-6"
              }`}
            >
              <Star
                className="w-6 h-6"
                {...(pressed ? { fill: "currentColor" } : {})}
              />
            </Toggle>
          );
        })}
      </ToggleGroup>
      <span className="c-slate-6 fs-xs">
        {value.length > 0 ? `${value[0]} / 5` : "Click to rate"}
      </span>
    </div>
  );
}
