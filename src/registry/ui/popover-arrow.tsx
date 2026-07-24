"use client";

import { Popover } from "@base-ui/react/popover";
import { CalendarRotateSolid } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverArrow() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-f ai-c jc-c w-10 h-10 bw-1 bc-silver-2 br-lg bg-white c-slate-10 us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1" : ""
        }`}
      >
        <CalendarRotateSolid
          aria-label="Sprint info"
          role="img"
          className="w-5 h-5"
        />
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner sideOffset={16}>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="p-r"
                  />
                }
                className="px-4 py-3 w-60 bg-white bc-silver-2 c-slate-10 bw-1 br-lg"
              >
                <svg
                  viewBox="0 0 10 5"
                  className="p-a t--2 l-50% ml--2 w-4 h-2 c-silver-2"
                  style={{ fill: "white" }}
                >
                  <title>Arrow</title>
                  <path
                    d="M0 5 L5 0 L10 5"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
                  Sprint 6
                </Popover.Title>
                <Popover.Description className="m-0 c-slate-8 fs-xs">
                  Jun 15 - Jun 28, 2026 - Focus on dashboard reporting and team
                  collaboration features.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
