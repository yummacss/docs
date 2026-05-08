"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useEffect, useState } from "react";

export default function AutocompleteLoading() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setLoading(true);
      setHasResults(true);
      setOpen(true);
    } else {
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setHasResults(projects.length > 0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Autocomplete.Root items={projects} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="loading-input" className="c-slate-10 fs-sm fw-500">
          Search projects
        </label>
        <Autocomplete.Input
          id="loading-input"
          placeholder="Project name or team..."
          onChange={handleInputChange}
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
                {loading && hasResults ? (
                  <div className="d-f fd-c g-3 py-3 px-4">
                    <div className="d-f ai-c g-3">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-8 h-8 bg-silver-2 br-md"
                      />
                      <div className="d-f fd-c g-1">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-3 w-24 bg-silver-2 br-xs"
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-2 w-16 bg-silver-1 br-xs"
                        />
                      </div>
                    </div>
                  </div>
                ) : !loading && hasResults ? (
                  <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                    {(item: ProjectItem) => (
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
                                {item.team} · {item.status}
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    )}
                  </Autocomplete.List>
                ) : !loading && !hasResults ? (
                  <Autocomplete.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No results found.
                    </div>
                  </Autocomplete.Empty>
                ) : null}
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface ProjectItem {
  name: string;
  team: string;
  status: string;
  color: string;
}

const projects: ProjectItem[] = [
  {
    name: "Storefront Redesign",
    team: "Frontend Team",
    status: "In Progress",
    color: "bg-cyan-5",
  },
  {
    name: "API v3 Migration",
    team: "Platform Team",
    status: "Active",
    color: "bg-violet-5",
  },
  {
    name: "Design System",
    team: "Design Team",
    status: "Active",
    color: "bg-coral-5",
  },
  {
    name: "Mobile App",
    team: "Mobile Team",
    status: "In Progress",
    color: "bg-magenta-5",
  },
  {
    name: "Analytics Dashboard",
    team: "Data Team",
    status: "In Progress",
    color: "bg-indigo-5",
  },
  {
    name: "Auth Service",
    team: "Platform Team",
    status: "Active",
    color: "bg-lime-5",
  },
  {
    name: "Billing Portal",
    team: "Payments Team",
    status: "Backlog",
    color: "bg-blue-5",
  },
];
