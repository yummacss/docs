"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { BellNotification } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";

export default function TooltipInset() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-slate-8 bw-0 c-p h:c-slate-12 fv:oo-2 fv:oc-indigo-5">
          <BellNotification aria-label="Notifications" className="w-6 h-6" />
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
                className="px-3 py-2 bg-white bc-silver-2 c-slate-10 bw-1 br-lg fs-sm bs-i-sm us-none"
              >
                3 unread notifications
              </Tooltip.Popup>
            </AnimatePresence>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
