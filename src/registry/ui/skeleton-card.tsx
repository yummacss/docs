"use client";

import { motion } from "motion/react";

export default function SkeletonCard() {
  return (
    <div className="d-f o-h fd-c w-64 bg-white bc-silver-2 bw-1 br-md bs-o-xs">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-32 w-100% bg-silver-2"
      />
      <div className="d-f fd-c g-3 p-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-4 w-40 bg-silver-2 br-sm"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-100% bg-silver-1 br-xs"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-60% bg-silver-1 br-xs"
        />
        <div className="d-f jc-sb ai-c mt-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-7 w-16 bg-silver-2 br-md"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-3 w-12 bg-silver-1 br-xs"
          />
        </div>
      </div>
    </div>
  );
}
