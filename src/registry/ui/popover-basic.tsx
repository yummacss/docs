"use client";

import { Popover } from "@base-ui/react/popover";
import { ChatCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExamplePopover() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-f ai-c jc-c d-10 bw-1 bc-silver-2 br-2 bg-white c-slate-10 us-none c-p h:bg-silver-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
          open ? "bg-silver-1" : ""
        }`}
      >
        <ChatCircleIcon size={20} aria-label="Messages" />
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
                className="bw-1 bc-silver-2 br-2 bg-white bsh-lg px-4 py-3 c-slate-10 w-56"
              >
                <Popover.Title className="fs-sm fw-600 c-slate-10 m-0 mb-1">
                  Start a conversation
                </Popover.Title>
                <Popover.Description className="fs-xs c-slate-8 m-0">
                  Send a message to your team.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
