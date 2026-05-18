"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { TrashBin } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";

export default function TooltipClose() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-red-7 bw-0 c-p h:c-red-8 fv:oo-2 fv:oc-red-6">
          <TrashBin aria-label="Archive task" className="w-6 h-6" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
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
                Delete task
              </Tooltip.Popup>
            </AnimatePresence>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
