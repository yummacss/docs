"use client";

import { Progress } from "@base-ui/react/progress";
import { useEffect, useState } from "react";

export default function ProgressStatic() {
  const [value, setValue] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) =>
        Math.min(100, Math.round(current + Math.random() * 25)),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className="d-f fd-c g-2 w-64" value={value}>
      <div className="d-f jc-sb ai-c">
        <Progress.Label className="c-slate-10 fs-sm fw-500">
          Sprint progress
        </Progress.Label>
        <Progress.Value className="c-slate-8 fs-sm" />
      </div>
      <Progress.Track className="o-h h-2 bg-silver-2 br-9999">
        <Progress.Indicator
          className={(state) =>
            `h-100% br-9999 ${state.status === "complete" ? "bg-green" : "bg-indigo"}`
          }
        />
      </Progress.Track>
    </Progress.Root>
  );
}
