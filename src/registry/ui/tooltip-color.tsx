"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { FilePenLine, FilePlusCorner, FileText, Shredder } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export default function TooltipColor() {
  return (
    <Tooltip.Provider>
      <div className="d-f g-1">
        {items.map(({ icon: Icon, label, ariaLabel }) => (
          <Tooltip.Root key={label}>
            <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-indigo h:c-indigo-7 bw-0 c-p fv:oo-2 fv:oc-indigo-5">
              <Icon aria-label={ariaLabel} className="w-6 h-6" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <AnimatePresence>
                  <Tooltip.Popup
                    render={
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    }
                    className="px-3 py-2 bg-indigo-7 c-white br-md fs-sm bs-o-xs us-none"
                  >
                    {label}
                  </Tooltip.Popup>
                </AnimatePresence>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

const items = [
  {
    icon: FilePlusCorner,
    label: "Create task",
    ariaLabel: "Create a new task",
  },
  { icon: FileText, label: "View task", ariaLabel: "View task" },
  {
    icon: FilePenLine,
    label: "Edit task",
    ariaLabel: "Edit task",
  },
  { icon: Shredder, label: "Delete task", ariaLabel: "Delete task" },
];
