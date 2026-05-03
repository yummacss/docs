"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function CollapsibleDisabled() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      disabled
      className="w-80 bg-white bc-silver-2 br-lg bw-1 c-na o-50"
    >
      <Collapsible.Trigger
        className="d-f jc-sb ai-c w-full px-4 py-3 c-p us-none"
      >
        <div className="d-f ai-c g-2">
          <span className="c-slate-8 fs-sm fw-500">Project Settings</span>
        </div>
        <div className="d-f ai-c jc-c w-5 h-5 c-slate-6">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </Collapsible.Trigger>
      <AnimatePresence>
        {open && (
          <Collapsible.Panel>
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="o-h"
            >
              <div className="px-4 pb-3">
                <p className="c-slate-8 fs-sm">
                  Configure your project preferences and team settings.
                </p>
              </div>
            </motion.div>
          </Collapsible.Panel>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  );
}