"use client";

import { Button } from "@base-ui/react/button";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ButtonOutlined() {
  return (
    <Button
      className="d-if ai-c px-3 py-2 bg-transparent bc-indigo c-indigo br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none c-p h:bg-indigo-1 fv:oo-2 fv:oc-indigo-3"
      render={(props) => (
        <motion.button
          type="button"
          {...(props as HTMLMotionProps<"button">)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Track
        </motion.button>
      )}
    />
  );
}
