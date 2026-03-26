"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowRotateLeft,
  Copy,
  Scissors,
  SquareDashed,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleContextMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-silver-2 c-slate-10 bw-1 br-md fs-sm fw-600 us-none">
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <Scissors className="w-4 h-4 c-slate-5 fs-0" />
                  Cut
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <Copy className="w-4 h-4 c-slate-5 fs-0" />
                  Copy
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <Copy className="w-4 h-4 c-slate-5 fs-0" />
                  Paste
                </ContextMenu.Item>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <SquareDashed className="w-4 h-4 c-slate-5 fs-0" />
                  Select all
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                    }`
                  }
                >
                  <ArrowRotateLeft className="w-4 h-4 c-slate-5 fs-0" />
                  Undo
                </ContextMenu.Item>

                <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pr-8 pl-3 fs-sm us-none c-p br-sm mx-1 ${
                      state.highlighted ? "bg-red-1 c-red" : "c-red h:bg-red-1"
                    }`
                  }
                >
                  <TrashBin className="w-4 h-4 fs-0" />
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
