"use client";

import { Progress } from "@base-ui/react/progress";
import { motion } from "motion/react";
import * as React from "react";

export default function ExampleProgress() {
  const [value, setValue] = React.useState(20);

  React.useEffect(() => {
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
        <Progress.Label className="fs-sm fw-600 c-slate-10">
          Uploading files
        </Progress.Label>
        <Progress.Value className="fs-sm c-slate-8" />
      </div>
      <Progress.Track className="o-h bg-silver-2 h-2 br-pill">
        <Progress.Indicator
          render={
            <motion.div
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          }
          className="bg-indigo h-full br-pill"
        />
      </Progress.Track>
    </Progress.Root>
  );
}
