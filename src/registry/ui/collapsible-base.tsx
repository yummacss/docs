"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { CaretRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleCollapsible() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-64 c-slate-10"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-2 bw-1 fs-sm fw-600 c-p h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <CaretRightIcon size={12} weight="bold" />
        </motion.span>
        System requirements
      </Collapsible.Trigger>

      <AnimatePresence initial={false}>
        {open && (
          <Collapsible.Panel
            render={
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            }
            className="d-b o-h"
          >
            <div className="d-f fd-c g-2 mt-1 py-3 px-4 bg-white bc-silver-2 br-2 bw-1 fs-sm">
              <div>Node.js 18 or later</div>
              <div>macOS, Windows, or Linux</div>
              <div>4GB RAM minimum</div>
            </div>
          </Collapsible.Panel>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  );
}
