"use client";

import { Button } from "@base-ui/react/button";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ButtonLink() {
  return (
    <Button
      className="d-if ai-c px-3 py-2 bg-transparent c-slate-10 br-md bw-0 tuo-2 fw-500 h:td-u fv:oo-2 fv:oc-indigo-3"
      render={(props) => (
        <motion.button
          type="button"
          {...(props as HTMLMotionProps<"button">)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Learn more
        </motion.button>
      )}
    />
  );
}
