"use client";

import { Button } from "@base-ui/react/button";
import { SystemRestart } from "iconoir-react";
import { motion } from "motion/react";

export default function ButtonLoading() {
  return (
    <Button
      disabled
      className="d-if ai-c g-2 px-3 py-2 bg-indigo bc-indigo-7 c-white br-lg bw-1 fw-500 o-60 us-none c-p"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <SystemRestart className="w-4 h-4" />
      </motion.div>
      Saving...
    </Button>
  );
}
