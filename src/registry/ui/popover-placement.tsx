"use client";

import { Popover } from "@base-ui/react/popover";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const sides = ["top", "right", "bottom", "left"] as const;

export default function PopoverPlacement() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="d-g gtc-2 g-3">
      {sides.map((side) => (
        <Popover.Root
          key={side}
          open={open === side}
          onOpenChange={(isOpen) => setOpen(isOpen ? side : null)}
        >
          <Popover.Trigger
            className={(state) =>
              `d-f ai-c jc-c h-10 px-3 bw-1 bc-silver-3 br-lg bg-white c-slate-10 fs-sm us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5 ${
                state.open ? "bg-silver-1" : ""
              }`
            }
          >
            {side}
          </Popover.Trigger>
          <AnimatePresence>
            {open === side && (
              <Popover.Portal keepMounted>
                <Popover.Positioner side={side} sideOffset={8}>
                  <Popover.Popup
                    render={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      />
                    }
                    className="px-4 py-3 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
                  >
                    <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
                      {side.charAt(0).toUpperCase() + side.slice(1)}
                    </Popover.Title>
                    <Popover.Description className="m-0 c-slate-8 fs-xs">
                      {side === "top" && "Quick access to project settings and configuration."}
                      {side === "right" && "View and manage task dependencies and blockers."}
                      {side === "bottom" && "Additional details about the current sprint."}
                      {side === "left" && "Navigate between boards and timelines."}
                    </Popover.Description>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            )}
          </AnimatePresence>
        </Popover.Root>
      ))}
    </div>
  );
}
