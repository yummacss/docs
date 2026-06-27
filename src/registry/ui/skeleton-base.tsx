"use client";

import { motion } from "motion/react";

export default function SkeletonBase() {
  return (
    <div className="d-f fd-c g-5 p-8 h-56">
      <div className="d-f ai-c g-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-10 h-10 bg-silver-2 br-9999"
        />
        <div className="d-f fd-c g-2 fg-1">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-4 w-48 bg-silver-2 br-sm"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-3 w-32 bg-silver-1 br-xs"
          />
        </div>
      </div>
      <div className="d-f fd-c g-3">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-100% bg-silver-2 br-xs"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-80% bg-silver-2 br-xs"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-60% bg-silver-2 br-xs"
        />
      </div>
      <div className="d-f g-3">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-8 w-20 bg-silver-2 br-lg"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-8 w-24 bg-silver-2 br-lg"
        />
      </div>
    </div>
  );
}
