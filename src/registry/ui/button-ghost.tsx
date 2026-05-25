"use client";

import { Button } from "@base-ui/react/button";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ButtonGhost() {
  return (
    <Button
      className="d-if ai-c px-3 py-2 bg-transparent c-slate-10 br-md bw-0 fw-500 tp-c tdu-150 ttf-io us-none c-p h:bg-silver-2 fv:oo-2 fv:oc-indigo-3"
      render={(props) => (
        <motion.button
          type="button"
          {...(props as HTMLMotionProps<"button">)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          View details
        </motion.button>
      )}
    />
  );
}
