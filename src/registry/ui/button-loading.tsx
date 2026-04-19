"use client";

import { Button } from "@base-ui/react/button";
import { Clock } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function ButtonLoading() {
  return (
    <Button
      disabled
      className="d-if ai-c g-2 px-3 py-2 bg-indigo bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md o-60 us-none c-p"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="w-4 h-4" />
      </motion.div>
      Please wait
    </Button>
  );
}
