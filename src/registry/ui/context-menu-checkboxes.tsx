"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Check } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ContextMenuCheckboxes() {
  const [open, setOpen] = useState(false);
  const [allTasks, setAllTasks] = useState(true);
  const [assigned, setAssigned] = useState(true);
  const [dueToday, setDueToday] = useState(false);
  const [muted, setMuted] = useState(false);

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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 tt-u ls-3">
                  Task options
                </div>

                <ContextMenu.CheckboxItem
                  checked={allTasks}
                  onCheckedChange={setAllTasks}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  All tasks
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={assigned}
                  onCheckedChange={setAssigned}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Assigned to me
                </ContextMenu.CheckboxItem>

                <ContextMenu.CheckboxItem
                  checked={dueToday}
                  onCheckedChange={setDueToday}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Due today
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator className="my-1 w-full h-px bg-silver-2" />

                <ContextMenu.CheckboxItem
                  checked={muted}
                  onCheckedChange={setMuted}
                  className={(state) =>
                    `d-f ai-c g-2 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-lg mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <ContextMenu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </ContextMenu.CheckboxItemIndicator>
                  </span>
                  Mute task
                </ContextMenu.CheckboxItem>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}
