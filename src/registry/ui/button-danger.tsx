"use client";

import { Button } from "@base-ui/react/button";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function ButtonDanger() {
  return (
    <Button
      className="d-if ai-c px-3 py-2 bg-red h:bg-red-8 bc-red-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-red-3"
      render={(props) => (
        <motion.button
          type="button"
          {...(props as HTMLMotionProps<"button">)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Delete project
        </motion.button>
      )}
    />
  );
}
