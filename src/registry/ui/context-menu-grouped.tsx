"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ContextMenuGrouped() {
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
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg w-48"
              >
                <ContextMenu.Group>
                  <ContextMenu.GroupLabel className="px-3 py-1 fs-xs fw-600 c-slate-5 tt-u ls-3">
                    File
                  </ContextMenu.GroupLabel>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    New file
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Open
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Save
                  </ContextMenu.Item>
                </ContextMenu.Group>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Group>
                  <ContextMenu.GroupLabel className="px-3 py-1 fs-xs fw-600 c-slate-5 tt-u ls-3">
                    Edit
                  </ContextMenu.GroupLabel>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Cut
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Copy
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Paste
                  </ContextMenu.Item>
                </ContextMenu.Group>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Group>
                  <ContextMenu.GroupLabel className="px-3 py-1 fs-xs fw-600 c-slate-5 tt-u ls-3">
                    View
                  </ContextMenu.GroupLabel>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Zoom in
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    className={(state) =>
                      `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-sm mx-1 ${
                        state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                      }`
                    }
                  >
                    Zoom out
                  </ContextMenu.Item>
                </ContextMenu.Group>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}
