"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  ArrowUpFromSquare,
  ArrowUturnCcwLeft,
  ChevronRight,
  Pencil,
  Tag,
  TrashBin,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuNested() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bc-slate-3 c-slate-10 bs-d bw-1 br-lg fs-sm fw-500 us-none">
        Right-click task
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
                className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger
                    className={(state) =>
                      `d-f ai-c jc-sb g-2 py-2 pl-3 pr-3 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`
                    }
                  >
                    <span className="d-f ai-c g-2">
                      <Tag className="fs-0 w-4 h-4 c-slate-5" />
                      Add Label
                    </span>
                    <ChevronRight className="fs-0 w-3 h-3 c-slate-4" />
                  </ContextMenu.SubmenuTrigger>

                  <ContextMenu.Portal>
                    <ContextMenu.Positioner
                      className="ow-0"
                      sideOffset={-4}
                      alignOffset={-4}
                    >
                      <ContextMenu.Popup className="py-1 w-48 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                        {labels.map((label) => (
                          <ContextMenu.Item
                            key={label.name}
                            className={(state) =>
                              `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                            }
                          >
                            <span
                              className="d-f ai-c jc-c w-3 h-3 br-pill"
                              style={{ backgroundColor: label.color }}
                            />
                            <span className="c-slate-10">{label.name}</span>
                          </ContextMenu.Item>
                        ))}
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <Pencil className="fs-0 w-4 h-4 c-slate-5" />
                  Edit task
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ArrowUturnCcwLeft className="fs-0 w-4 h-4 c-slate-5" />
                  Assign to
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                  }
                >
                  <ArrowUpFromSquare className="fs-0 w-4 h-4 c-slate-5" />
                  Share task
                </ContextMenu.Item>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.Item
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-red c-p br-lg mx-1 ${
                      state.highlighted ? "bg-red-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <TrashBin className="fs-0 w-4 h-4" />
                  Archive task
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

const labels = [
  { name: "High", color: "#e63946" },
  { name: "Medium", color: "#ffb81c" },
  { name: "Low", color: "#10b981" },
];
