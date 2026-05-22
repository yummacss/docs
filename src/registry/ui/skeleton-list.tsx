"use client";

import { motion } from "motion/react";

export default function SkeletonList() {
  return (
    <div className="d-f fd-c g-4 p-8 h-56">
      {[0, 1, 2].map((i) => (
        <div key={i} className="d-f ai-c g-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="w-9 h-9 bg-silver-2 br-md"
          />
          <div className="d-f fd-c g-1 fg-1">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-3 w-40 bg-silver-2 br-xs"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-2 w-24 bg-silver-1 br-xs"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
