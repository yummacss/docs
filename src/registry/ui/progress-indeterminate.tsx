"use client";

import { Progress } from "@base-ui/react/progress";
import { motion } from "motion/react";

export default function ProgressIndeterminate() {
  return (
    <div className="d-f fd-c g-4 w-64">
      <Progress.Root className="d-f fd-c g-2" value={null}>
        <div className="d-f jc-sb">
          <Progress.Label className="c-slate-10 fs-sm fw-500">
            Loading data
          </Progress.Label>
          <Progress.Value className="c-slate-8 fs-sm" />
        </div>
        <Progress.Track className="o-h h-2 bg-silver-2 br-pill">
          <Progress.Indicator
            render={
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1/3 h-full bg-indigo br-pill"
              />
            }
            className="h-full"
          />
        </Progress.Track>
      </Progress.Root>
    </div>
  );
}