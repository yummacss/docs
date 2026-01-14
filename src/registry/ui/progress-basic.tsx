"use client";

import { Progress } from "@base-ui/react/progress";
import * as React from "react";

export default function ExampleProgress() {
  const [value, setValue] = React.useState(20);

  // Simulate changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) =>
        Math.min(100, Math.round(current + Math.random() * 25)),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className="d-g gtc-2 rg-2 w-48" value={value}>
      <Progress.Label className="fs-sm fw-500 c-slate">
        Export data
      </Progress.Label>
      <Progress.Value className="m-0 fs-sm c-slate ta-r gcs-2" />
      <Progress.Track className="o-h bg-silver-2 h-1 progress-track">
        <Progress.Indicator className="d-b bg-slate-6 progress-indicator" />
      </Progress.Track>

      <style>{`
        .progress-track {
          grid-column: 1 / 3;
          box-shadow: inset 0 0 0 1px var(--silver-4);
        }
        .progress-indicator {
          height: 100%;
          transition: width 500ms;
        }
      `}</style>
    </Progress.Root>
  );
}
