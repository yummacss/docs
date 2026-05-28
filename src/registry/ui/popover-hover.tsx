"use client";

import { Popover } from "@base-ui/react/popover";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverHover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        openOnHover
        delay={300}
        className={`d-f ai-c jc-c h-10 px-3 bw-1 bc-silver-3 br-md bg-white c-slate-10 fs-sm us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1" : ""
        }`}
      >
        TSK-104
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
                className="px-4 py-3 w-56 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs"
              >
                <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
                  TSK-104 - Reporting Dashboard
                </Popover.Title>
                <div className="d-f ai-c g-2 my-2">
                  <span className="d-if ai-c px-2 py-0.5 bg-indigo-1 c-indigo-7 br-9999 fs-xs fw-500">
                    In Progress
                  </span>
                  <span className="c-slate-6 fs-xs">High</span>
                </div>
                <Popover.Description className="m-0 c-slate-8 fs-xs">
                  Build the interactive chart components for the analytics
                  dashboard with real-time data.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
