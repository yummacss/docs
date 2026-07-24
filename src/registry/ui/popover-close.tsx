"use client";

import { Popover } from "@base-ui/react/popover";
import { HelpCircle, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverClose() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-f ai-c jc-c w-10 h-10 bw-1 bc-silver-2 br-lg bg-white c-slate-10 us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1" : ""
        }`}
      >
        <HelpCircle aria-label="Task info" className="w-5 h-5" />
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
                className="px-4 py-3 w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-lg"
              >
                <div className="d-f ai-c jc-sb mb-1">
                  <Popover.Title className="m-0 c-slate-10 fs-sm fw-500">
                    API Integration
                  </Popover.Title>
                  <Popover.Close
                    render={
                      <button
                        type="button"
                        className="d-f ai-c jc-c w-5 h-5 bg-transparent c-slate-5 bw-0 br-lg c-p h:bg-silver-2 h:c-slate-8 fv:oo--1 fv:oc-indigo-5"
                      >
                        <Xmark aria-hidden className="w-4 h-4" />
                      </button>
                    }
                  />
                </div>
                <Popover.Description className="m-0 c-slate-8 fs-xs">
                  Design the REST API endpoints for the reporting dashboard,
                  including data aggregation and caching.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
