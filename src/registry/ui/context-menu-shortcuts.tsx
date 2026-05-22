"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { ArrowBigUp, Command, Delete } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuShortcuts() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
        Right-click task
      </ContextMenu.Trigger>

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner className="ow-0" sideOffset={8}>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs"
              >
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Assign to</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <span>R</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Add watcher</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <span>M</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Copy task link</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <ArrowBigUp className="w-3 h-3" />
                    <span>C</span>
                  </span>
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Pin task</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <span>P</span>
                  </span>
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Mark as blocked</span>
                  <span className="d-f ai-c g-1 c-slate-6 fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <ArrowBigUp className="w-3 h-3" />
                    <span>B</span>
                  </span>
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c jc-sb g-2 py-2 pr-3 pl-3 fs-sm fw-500 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c g-2 fg-1">Archive task</span>
                  <span className="d-f ai-c g-1 c-red fw-400 fs-xs">
                    <Command className="w-3 h-3" />
                    <Delete className="w-3 h-3" />
                  </span>
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}
