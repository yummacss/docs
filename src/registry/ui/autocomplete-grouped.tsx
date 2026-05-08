"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Separator } from "@base-ui/react/separator";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root items={projectGroups} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="grouped-input" className="c-slate-10 fs-sm fw-500">
          Switch project
        </label>
        <Autocomplete.Input
          id="grouped-input"
          placeholder="Search projects by status"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-5"
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(group: ProjectGroup, groupIndex) => (
                    <Autocomplete.Group key={group.value}>
                      <div className="px-3 py-1 c-slate-6 fs-xs fw-500 tt-u ls-3">
                        {group.value}
                      </div>
                      {group.items.map((item) => (
                        <Autocomplete.Item
                          key={item.name}
                          value={item.name}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`}
                            >
                              <div
                                className={`d-if ai-c jc-c w-8 h-8 br-md fs-xs fw-500 c-white ${item.color}`}
                              >
                                {item.name[0]}
                              </div>
                              <div className="d-f fd-c">
                                <span className="fw-500">{item.name}</span>
                                <span className="c-slate-6 fs-xs">
                                  {item.team}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      ))}
                      {groupIndex < projectGroups.length - 1 && (
                        <Separator className="my-2 w-full h-px bg-silver-2" />
                      )}
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4 us-none">
                    No projects found.
                  </div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Project {
  name: string;
  team: string;
  color: string;
}

interface ProjectGroup {
  value: string;
  items: Project[];
}

const projectGroups: ProjectGroup[] = [
  {
    value: "Active",
    items: [
      { name: "Storefront Redesign", team: "Frontend Team", color: "bg-cyan-5" },
      { name: "API v3 Migration", team: "Platform Team", color: "bg-violet-5" },
      { name: "Design System", team: "Design Team", color: "bg-coral-5" },
    ],
  },
  {
    value: "In Progress",
    items: [
      { name: "Mobile App", team: "Mobile Team", color: "bg-magenta-5" },
      { name: "Analytics Dashboard", team: "Data Team", color: "bg-indigo-5" },
    ],
  },
  {
    value: "Backlog",
    items: [
      { name: "Admin Panel", team: "Backend Team", color: "bg-slate-5" },
      { name: "Billing Portal", team: "Payments Team", color: "bg-blue-5" },
    ],
  },
];
