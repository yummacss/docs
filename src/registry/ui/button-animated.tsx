"use client";

import { Button } from "@base-ui/react/button";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ButtonAnimated() {
  return (
    <div className="d-f ai-c g-3">
      <Button
        className="d-if ai-c px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-3"
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
      >
        Add member
      </Button>
      <Button
        className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-3"
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
      >
        Edit project
      </Button>
      <Button
        className="d-if ai-c px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-5"
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
      >
        Delete project
      </Button>
    </div>
  );
}
