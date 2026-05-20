"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { CircleQuestionMark } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function TooltipArrow() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-slate-8 bw-0 c-p h:c-slate-12 fv:oo-2 fv:oc-indigo-5">
          <CircleQuestionMark
            aria-label="Sprint schedule"
            className="w-6 h-6"
          />
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
                    className="p-r"
                  />
                }
                className="px-3 py-2 bg-white bc-silver-2 c-slate-10 bw-1 br-md fs-sm bs-o-xs us-none"
              >
                <svg
                  viewBox="0 0 10 5"
                  className="p-a b--2 l-50% ml--2 w-4 h-2 c-silver-2"
                  style={{ fill: "white" }}
                >
                  <title>Arrow</title>
                  <path
                    d="M0 0 L5 5 L10 0"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                Sprint planning starts at 10am
              </Tooltip.Popup>
            </AnimatePresence>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
