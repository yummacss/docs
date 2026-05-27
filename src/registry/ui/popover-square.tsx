"use client";

import { Popover } from "@base-ui/react/popover";
import { BellDot } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverSquare() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-f ai-c jc-c w-10 h-10 bw-1 bc-silver-2 bg-white c-slate-10 us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1" : ""
        }`}
      >
        <BellDot aria-label="Notifications" className="w-5 h-5" />
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="px-4 py-3 w-56 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs"
              >
                <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
                  Notifications
                </Popover.Title>
                <Popover.Description className="m-0 c-slate-8 fs-xs">
                  Review your recent alerts and updates.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
