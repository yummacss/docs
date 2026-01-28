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
      <Progress.Label className="fs-sm fw-500 c-slate-11">
        Export data
      </Progress.Label>
      <Progress.Value className="m-0 fs-sm c-slate-12 ta-r gcs-2" />
      <Progress.Track className="o-h bg-silver-2 h-2 br-pill bw-1 bc-silver-4 bs-s gcs-1 gce-3 progress-track">
        <Progress.Indicator className="d-b bg-slate-5 progress-indicator" />
      </Progress.Track>

      <style>{`
        .progress-indicator {
          height: 100%;
          transition: width 500ms;
        }
      `}</style>
    </Progress.Root>
  );
}
