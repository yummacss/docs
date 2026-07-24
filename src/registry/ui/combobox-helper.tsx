"use client";

import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxHelper() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-f fd-c g-2 c-slate-10 fs-sm">
      <label htmlFor="helper-input" className="fw-500">
        Assign member <span className="c-red-5">*</span>
      </label>
      <Combobox.Root items={users} open={open} onOpenChange={setOpen}>
        <div className="p-r">
          <Combobox.Input
            id="helper-input"
            placeholder="Search members"
            className="h-10 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
            <Combobox.Clear
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Clear selection"
            >
              <Xmark className="w-4 h-4" />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Open popup"
            >
              <ArrowSeparateVertical className="w-4 h-4" />
            </Combobox.Trigger>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <Combobox.Portal keepMounted>
              <Combobox.Positioner className="ow-0" sideOffset={8}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Combobox.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-lg">
                    <Combobox.List className="oy-auto py-1 max-h-60 ow-0">
                      {(user: string) => (
                        <Combobox.Item
                          key={user}
                          value={user}
                          className={(state) =>
                            `d-f ai-c py-2 px-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          {user}
                        </Combobox.Item>
                      )}
                    </Combobox.List>
                    <Combobox.Empty className="c-slate-6 fs-sm">
                      <div className="py-4 px-4">No users found.</div>
                    </Combobox.Empty>
                  </Combobox.Popup>
                </motion.div>
              </Combobox.Positioner>
            </Combobox.Portal>
          )}
        </AnimatePresence>
      </Combobox.Root>
      <p className="m-0 c-slate-6 fs-xs">
        Only project members can be assigned.
      </p>
    </div>
  );
}

const users = [
  "Adrian",
  "Aidan",
  "Jade",
  "Jessica",
  "Jocelyn",
  "John",
  "Katherine",
  "Liam",
  "Liliana",
  "Maria",
  "Melanie",
  "Noah",
];
