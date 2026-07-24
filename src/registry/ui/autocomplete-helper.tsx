"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteHelper() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-f fd-c g-2">
      <label htmlFor="helper-input" className="c-slate-10 fs-sm fw-500">
        Assign member <span className="c-red-5">*</span>
      </label>
      <Autocomplete.Root items={teamMembers} open={open} onOpenChange={setOpen}>
        <Autocomplete.Input
          id="helper-input"
          placeholder="Search members"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md fv:oo--1 fv:oc-indigo-5"
        />

        <AnimatePresence>
          {open && (
            <Autocomplete.Portal keepMounted>
              <Autocomplete.Positioner className="ow-0" sideOffset={8}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-lg">
                    <Autocomplete.List className="oy-auto max-h-60 py-1 ow-0">
                      {(member: string) => (
                        <Autocomplete.Item
                          key={member}
                          value={member}
                          className={(state) =>
                            `d-f ai-c px-3 py-2 fs-sm fw-500 us-none c-p br-md mx-1 c-slate-10 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          {member}
                        </Autocomplete.Item>
                      )}
                    </Autocomplete.List>
                    <Autocomplete.Empty className="c-slate-6 fs-sm">
                      <div className="pt-2 pb-3 px-4 us-none">
                        No members found.
                      </div>
                    </Autocomplete.Empty>
                  </Autocomplete.Popup>
                </motion.div>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          )}
        </AnimatePresence>
      </Autocomplete.Root>
      <p className="m-0 c-slate-6 fs-xs">
        Only project members can be assigned.
      </p>
    </div>
  );
}

const teamMembers = [
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
