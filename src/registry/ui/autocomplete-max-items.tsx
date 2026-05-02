"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const limit = 5;

export default function AutocompleteMaxItems() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const matchCount = query.trim()
    ? Projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .length
    : Projects.length;

  return (
    <Autocomplete.Root items={Projects} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="limit-input" className="c-slate-10 fs-sm fw-500">
          Switch project
        </label>
        <Autocomplete.Input
          id="limit-input"
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="oy-auto py-1 ow-0">
                  {(item: Project, index: number) => {
                    if (index >= limit) return null;
                    return (
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
                            <span
                              className={`d-if ai-c jc-c w-6 h-6 br-sm fs-xs fw-500 c-white ${item.color}`}
                            >
                              {item.name[0]}
                            </span>
                            <div className="d-f fd-c min-w-0">
                              <span className="fw-500">{item.name}</span>
                              <span className="c-slate-6 fs-xs">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    );
                  }}
                </Autocomplete.List>
                {matchCount > 0 && (
                  <div className="d-f ai-c jc-sb px-3 py-2 bc-silver-2 bbw-1 btw-0">
                    <span className="c-slate-6 fs-xs fw-500">
                      Showing {Math.min(limit, matchCount)} of {matchCount}{" "}
                      {matchCount === 1 ? "project" : "projects"}
                    </span>
                  </div>
                )}
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
  status: string;
  color: string;
}

const Projects: Project[] = [
  { name: "Storefront Redesign", status: "In Progress", color: "bg-cyan-4" },
  { name: "API v3 Migration", status: "Review", color: "bg-violet-4" },
  { name: "Design System", status: "Active", color: "bg-coral-4" },
  { name: "Mobile App", status: "Planning", color: "bg-magenta-4" },
  { name: "Analytics Dashboard", status: "In Progress", color: "bg-indigo-4" },
  { name: "Auth Service", status: "Active", color: "bg-lime-4" },
  { name: "Billing Portal", status: "Backlog", color: "bg-blue-4" },
  { name: "Admin Panel", status: "In Progress", color: "bg-rose-4" },
];
