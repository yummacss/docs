"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

interface TechGroup {
  value: string;
  items: string[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    value: "Frontend",
    items: ["React", "Vue", "Svelte", "Angular", "Solid"],
  },
  {
    value: "Backend",
    items: ["Node.js", "Deno", "Bun", "Django", "Rails"],
  },
  {
    value: "Database",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis"],
  },
];

export default function ExampleAutocomplete() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={TECH_GROUPS} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="grouped-input" className="c-slate-10 fs-sm fw-600">
          Technology
        </label>
        <Autocomplete.Input
          id="grouped-input"
          placeholder="e.g. React"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-2 fs-sm fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <AnimatePresence>
        {open && (
          <Autocomplete.Portal keepMounted>
            <Autocomplete.Positioner className="ow-0" sideOffset={4}>
              <Autocomplete.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-2 bs-o-lg"
              >
                <Autocomplete.List className="o-y-auto max-h-72 py-1 ow-0">
                  {(group: TechGroup) => (
                    <Autocomplete.Group key={group.value}>
                      <Autocomplete.GroupLabel className="px-3 pt-2 pb-1 c-slate-5 fs-xs fw-600 tt-u ls-4">
                        {group.value}
                      </Autocomplete.GroupLabel>
                      {group.items.map((item) => (
                        <Autocomplete.Item
                          key={item}
                          value={item}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`py-2 px-3 fs-sm us-none c-d c-p br-1 mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1"
                                  : "h:bg-silver-1"
                              }`}
                            >
                              {item}
                            </div>
                          )}
                        />
                      ))}
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="py-4 px-4">No results found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}
