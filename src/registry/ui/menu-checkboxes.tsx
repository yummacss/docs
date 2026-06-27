"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, NavArrowDown } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MenuCheckboxes() {
  const [open, setOpen] = useState(false);
  const [allTasks, setAllTasks] = useState(true);
  const [assigned, setAssigned] = useState(true);
  const [dueToday, setDueToday] = useState(false);

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Filter <NavArrowDown className="w-3 h-3" />
      </Menu.Trigger>

      <AnimatePresence>
        {open && (
          <Menu.Portal keepMounted>
            <Menu.Positioner className="ow-0" sideOffset={8}>
              <Menu.Popup
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
                <div className="px-3 py-1 c-slate-5 fs-xs fw-500 ls-3">
                  Task filters
                </div>

                <Menu.CheckboxItem
                  checked={allTasks}
                  onCheckedChange={setAllTasks}
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <Menu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </Menu.CheckboxItemIndicator>
                  </span>
                  All tasks
                </Menu.CheckboxItem>

                <Menu.CheckboxItem
                  checked={assigned}
                  onCheckedChange={setAssigned}
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <Menu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </Menu.CheckboxItemIndicator>
                  </span>
                  Assigned to me
                </Menu.CheckboxItem>

                <Menu.CheckboxItem
                  checked={dueToday}
                  onCheckedChange={setDueToday}
                  className={(state) =>
                    `d-f ai-c g-3 py-2 pl-3 pr-4 fs-sm fw-500 us-none c-p br-xl mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`
                  }
                >
                  <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
                    <Menu.CheckboxItemIndicator>
                      <Check className="w-3 h-3 c-indigo" />
                    </Menu.CheckboxItemIndicator>
                  </span>
                  Due today
                </Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}
