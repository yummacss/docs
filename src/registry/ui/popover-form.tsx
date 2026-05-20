"use client";

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { Popover } from "@base-ui/react/popover";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function PopoverForm() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={`d-if ai-c g-2 px-3 py-2 bw-1 bc-silver-2 br-md bg-white c-slate-10 fs-sm fw-500 bs-o-xs us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5 ${
          open ? "bg-silver-1/50" : ""
        }`}
      >
        <Plus className="w-4 h-4" />
        New Task
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal keepMounted>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="px-4 py-3 w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Popover.Title className="m-0 mb-3 c-slate-10 fs-sm fw-500">
                  Quick Add Task
                </Popover.Title>
                <div className="d-f fd-c g-3">
                  <Field.Root className="d-f fd-c g-1">
                    <Field.Label className="c-slate-10 fs-xs fw-500">
                      Title
                    </Field.Label>
                    <Field.Control
                      render={
                        <Input className="h-9 w-100% px-3 min-w-0 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5" />
                      }
                      placeholder="Enter task title"
                    />
                  </Field.Root>
                  <div className="d-f g-2 jc-e">
                    <Popover.Close
                      render={
                        <Button className="d-if ai-c px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fs-xs fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      Cancel
                    </Popover.Close>
                    <Popover.Close
                      render={
                        <Button className="d-if ai-c px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fs-xs fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      Add Task
                    </Popover.Close>
                  </div>
                </div>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
