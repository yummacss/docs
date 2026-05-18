"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";

const sides = [
  { side: "top" as const, icon: ArrowUp, label: "Top" },
  { side: "right" as const, icon: ArrowRight, label: "Right" },
  { side: "bottom" as const, icon: ArrowDown, label: "Bottom" },
  { side: "left" as const, icon: ArrowLeft, label: "Left" },
];

export default function TooltipPlacement() {
  return (
    <Tooltip.Provider>
      <div className="d-g gtc-2 g-3">
        {sides.map(({ side, icon: Icon, label }) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger className="d-f ai-c jc-c w-10 h-10 bg-white c-slate-8 bc-silver-2 bw-1 br-md c-p h:c-slate-12 fv:oo-2 fv:oc-indigo-5">
              <Icon aria-label={label} className="w-5 h-5" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner side={side} sideOffset={8}>
                <AnimatePresence>
                  <Tooltip.Popup
                    render={
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    }
                    className="px-3 py-2 bg-white c-slate-10 bc-silver-2 bw-1 br-md bs-o-xs us-none fs-sm"
                  >
                    {label}
                  </Tooltip.Popup>
                </AnimatePresence>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}
