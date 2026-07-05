"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { NavArrowRight } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="bg-white d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-xxl cs-s fs-sm fw-500 us-none">
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
                className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs"
              >
                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Quick Actions
                </div>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Duplicate
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Bookmark
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                  Share & Export
                </div>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Share
                </ContextMenu.Item>

                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="fg-1">Export as</span>
                    <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs">
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          PDF
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          CSV
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className={(state) =>
                            `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          Markdown
                        </ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Print
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Copy link
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  Archive
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-100% h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-red c-p br-xl mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
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
