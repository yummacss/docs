"use client";

import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxMd() {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root items={projects} open={open} onOpenChange={setOpen}>
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="project-input" className="fw-500">
          Select project
        </label>
        <div className="p-r">
          <Combobox.Input
            id="project-input"
            placeholder="Search projects..."
            className="h-9 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-9 c-slate-6">
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
                  <Combobox.List className="oy-auto py-1 max-h-72 ow-0">
                    {(project: Project) => (
                      <Combobox.Item
                        key={project.name}
                        value={project.name}
                        className={(state) =>
                          `d-f ai-c g-2 py-2 px-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                            state.highlighted
                              ? "bg-silver-2/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <span className="fg-1 min-w-0 o-h to-e ws-nw">{project.name}</span>
                        <span className="fs-0 c-slate-6 fw-400">{project.status}</span>
                        <Combobox.ItemIndicator className="d-f ml-auto c-indigo">
                          <Check className="w-3 h-3" />
                        </Combobox.ItemIndicator>
                      </Combobox.Item>
                    )}
                  </Combobox.List>
                  <Combobox.Empty className="c-slate-6 fs-sm">
                    <div className="py-4 px-4">No projects found.</div>
                  </Combobox.Empty>
                </Combobox.Popup>
              </motion.div>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

interface Project {
  name: string;
  status: string;
}

const projects: Project[] = [
  { name: "Redesign Dashboard", status: "In Progress" },
  { name: "API Integration", status: "Planning" },
  { name: "User Onboarding", status: "Review" },
  { name: "Mobile App v2", status: "In Progress" },
  { name: "Payment System", status: "Done" },
  { name: "Notification Service", status: "Planning" },
  { name: "Auth Migration", status: "In Progress" },
  { name: "Analytics Pipeline", status: "Review" },
  { name: "Search Overhaul", status: "Backlog" },
  { name: "Dark Mode", status: "Done" },
  { name: "Accessibility Audit", status: "Backlog" },
  { name: "Performance Sprint", status: "In Progress" },
];
