"use client";

import { motion } from "motion/react";

const ENTRIES = Array.from({ length: 4 }, (_, i) => ({ id: `activity-${i}` }));

export default function SkeletonActivity() {
  return (
    <div className="d-f fd-c g-4 p-8 h-56">
      {ENTRIES.map((entry, i) => (
        <div key={entry.id} className="d-f ai-c g-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="w-9 h-9 bg-silver-2 br-9999 fs-0"
          />
          <div className="d-f fd-c g-1 fg-1">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-3 w-48 bg-silver-2 br-xs"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="h-2 w-32 bg-silver-1 br-xs"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
