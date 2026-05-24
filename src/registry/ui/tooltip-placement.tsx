"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { AnimatePresence, motion } from "motion/react";

export default function TooltipPlacement() {
  return (
    <Tooltip.Provider>
      <div className="d-g gtc-2 g-3">
        {sides.map((side) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger className="d-f ai-c jc-c h-10 px-3 bw-1 bc-silver-3 br-lg bg-white c-slate-10 fs-sm us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5">
              {side.charAt(0).toUpperCase() + side.slice(1)}
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
                    className="px-3 py-2 bg-white bc-silver-2 c-slate-10 bw-1 br-md fs-sm bs-o-xs us-none"
                  >
                    {side.charAt(0).toUpperCase() + side.slice(1)}
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

const sides = ["top", "right", "bottom", "left"] as const;