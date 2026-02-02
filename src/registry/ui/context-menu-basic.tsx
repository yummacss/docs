"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleContextMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bw-1 bc-silver-2 br-2 c-slate-10 fs-sm fw-600 us-none">
        Right click here
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0">
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="bw-1 bc-silver-2 br-2 bg-white bsh-lg py-1 c-slate-10"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Cut
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Copy
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Paste
                </ContextMenu.Item>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Select all
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  Undo
                </ContextMenu.Item>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f py-2 pr-8 pl-4 fs-sm us-none c-p c-red ${
                      state.highlighted ? "bg-red-1" : "h:bg-red-1"
                    }`
                  }
                >
                  Delete
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}
