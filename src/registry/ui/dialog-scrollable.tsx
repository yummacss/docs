"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DialogScrollable() {
  const [open, setOpen] = useState(false);
  const releases = mockData;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button className="px-3 py-2 bc-silver-2 c-slate-10 br-md bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5" />
        }
      >
        View activity
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20 bf-b-xs"
            />
            <Dialog.Viewport className="p-f i-0">
              <div className="d-f h-100% ai-c jc-c o-y-auto p-4">
                <Dialog.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  }
                  className="o-h w-96 max-w-100% bg-silver-1 bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
                >
                  <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1">
                    <Dialog.Title className="c-slate-10 fs-md fw-500">
                      Recent activity
                    </Dialog.Title>
                    <Dialog.Close
                      render={
                        <Button className="d-f ai-c jc-c w-7 h-7 bg-transparent c-slate-6 bw-0 br-md h:bg-silver-2 fv:oo-2 fv:oc-indigo-5" />
                      }
                    >
                      <Xmark aria-hidden className="w-4 h-4" />
                    </Dialog.Close>
                  </div>
                  <div className="d-f fd-c px-4 py-4 bg-white bc-silver-2 btr-lg btw-1">
                    <div className="d-f fd-c g-5">
                      {releases.map((r) => (
                        <div key={r.v} className="d-f fd-c g-2">
                          <span className="c-slate-10 fs-sm fw-500">
                            {r.v} — {r.d}
                          </span>
                          <ul className="d-f fd-c g-1 m-0 p-0 lst-none">
                            {r.items.map((item) => (
                              <li key={item} className="d-f ai-c g-2 c-slate-7 fs-sm">
                                <span className="d-b w-1 h-1 br-9999 bg-slate-4" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Popup>
              </div>
            </Dialog.Viewport>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

const mockData = [
  { v: "v4.0.0", d: "May 12, 2026", items: ["Revamped project dashboard with real-time analytics","New role-based permissions for team management","Automated sprint reports and velocity tracking","Cross-project dependency timelines","AI-powered task assignment suggestions","Customizable notification channels"] },
  { v: "v3.8.0", d: "April 28, 2026", items: ["Kanban board with drag-and-drop reordering","Gantt chart export to PDF and CSV","Team workload balancing suggestions","Custom swimlanes for workflow stages","Milestone dependency graphs"] },
  { v: "v3.6.0", d: "April 14, 2026", items: ["Task dependencies with blocking indicators","Custom workflow states per project","Bulk task assignment and priority updates","Recurring task templates","Template library for project blueprints"] },
  { v: "v3.4.0", d: "March 30, 2026", items: ["Time tracking with weekly summaries","Guest collaborator access for external clients","Automated invoice generation per project","Integration with Slack and Jira webhooks","Budget vs actual cost reports"] },
  { v: "v3.2.0", d: "March 15, 2026", items: ["Dashboard widgets with customizable layouts","Comment threads with @mentions and notifications","CSV import for tasks and milestones","Sprint burndown charts and velocity graphs","Resource allocation heatmaps"] },
  { v: "v3.0.0", d: "February 28, 2026", items: ["Complete UI redesign with new component library","Real-time collaborative editing for task descriptions","Advanced filtering and saved views","API rate limiting and usage dashboard","Team performance benchmarks"] },
];
