"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { CircleQuestionMark, Cog, SquarePen, Trash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export default function TooltipColor() {
  return (
    <Tooltip.Provider>
      <div className="d-f g-1">
        {items.map(({ icon: Icon, label, ariaLabel }) => (
          <Tooltip.Root key={label}>
            <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-slate-8 bw-0 c-p h:c-slate-12 fv:oo-2 fv:oc-indigo-5">
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
                    className="px-3 py-2 bg-indigo c-white br-md fs-sm bs-o-xs us-none"
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
    icon: CircleQuestionMark,
    label: "New task",
    ariaLabel: "Create a new task",
  },
  {
    icon: SquarePen,
    label: "Edit sprint",
    ariaLabel: "Edit current sprint",
  },
  { icon: Cog, label: "Settings", ariaLabel: "Project settings" },
  { icon: Trash, label: "Delete task", ariaLabel: "Delete project" },
];
