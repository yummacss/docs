"use client";

import { motion } from "motion/react";

export default function SkeletonFilters() {
  return (
    <div className="d-f fd-c g-4 p-8 h-56">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-10 w-100% bg-silver-2 br-md"
      />
      <div className="d-f g-2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.05 }}
          className="h-6 w-16 bg-silver-2 br-9999"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
          className="h-6 w-20 bg-silver-2 br-9999"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
          className="h-6 w-14 bg-silver-2 br-9999"
        />
      </div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        className="h-3 w-24 bg-silver-1 br-xs"
      />
      <div className="d-f ai-c g-4">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
          className="w-9 h-9 bg-silver-2 br-md fs-0"
        />
        <div className="d-f fd-c g-1 fg-1">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
            className="h-3 w-48 bg-silver-2 br-xs"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
            className="h-2 w-32 bg-silver-1 br-xs"
          />
        </div>
      </div>
    </div>
  );
}
