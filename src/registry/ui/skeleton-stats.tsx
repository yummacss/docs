"use client";

import { motion } from "motion/react";

const CARDS = Array.from({ length: 3 }, (_, i) => ({ id: `card-${i}` }));

export default function SkeletonStats() {
  return (
    <div className="d-f g-6 p-8 h-56">
      {CARDS.map((card, i) => (
        <div key={card.id} className="d-f fd-c ai-c jc-c g-3 fg-1">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="w-10 h-10 bg-silver-2 br-lg"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="h-6 w-16 bg-silver-2 br-xs"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="h-3 w-12 bg-silver-1 br-xs"
          />
        </div>
      ))}
    </div>
  );
}
