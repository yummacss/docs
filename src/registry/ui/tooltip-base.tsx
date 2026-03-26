"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { CircleQuestion } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";

export default function ExampleTooltip() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-slate-8 bw-0 c-p h:c-indigo fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          <CircleQuestion className="w-6 h-6" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4}>
            <AnimatePresence>
              <Tooltip.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="px-3 py-2 bg-slate-12 c-white br-sm fs-sm bs-o-sm"
              >
                Password must be 8+ characters
              </Tooltip.Popup>
            </AnimatePresence>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
