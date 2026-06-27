"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteMd() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root items={roles} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="autocomplete-md-input" className="c-slate-10 fs-sm fw-500">
          Filter by role
        </label>
        <Autocomplete.Input
          id="autocomplete-md-input"
          placeholder="Filter by role..."
          className="h-9 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
      </div>

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
                <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs">
                  <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                    {(role: Role) => (
                      <Autocomplete.Item
                        key={role.name}
                        value={role.name}
                        render={(props, state) => (
                          <div
                            {...props}
                            className={`d-f ai-c g-3 py-2 px-3 mx-1 c-slate-10 br-md fs-sm us-none c-p ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`}
                          >
                            <div className="d-f ai-c jc-c w-6 h-6 br-9999 bg-indigo-1 c-indigo fs-xs fw-500">
                              {role.name[0]}
                            </div>
                            <div className="d-f fd-c min-w-0">
                              <span className="o-h fw-500 to-e ws-nw">{role.name}</span>
                              <span className="c-slate-6 fs-xs">
                                {role.members} members
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    )}
                  </Autocomplete.List>
                  <Autocomplete.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No roles found.
                    </div>
                  </Autocomplete.Empty>
                </Autocomplete.Popup>
              </motion.div>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Role {
  name: string;
  members: number;
}

const roles: Role[] = [
  { name: "Developer", members: 8 },
  { name: "Designer", members: 4 },
  { name: "Product Manager", members: 2 },
  { name: "QA Engineer", members: 3 },
  { name: "DevOps", members: 2 },
  { name: "Data Analyst", members: 2 },
  { name: "UX Researcher", members: 3 },
  { name: "Technical Writer", members: 1 },
  { name: "Scrum Master", members: 1 },
  { name: "Engineering Lead", members: 2 },
];
