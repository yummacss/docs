"use client";

import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useEffect, useState } from "react";

export default function ComboboxLoading() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setLoading(true);
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
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Combobox.Root items={tasks} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="loading-input" className="c-slate-10 fs-sm fw-500">
          Search tasks
        </label>
        <div className="p-r">
          <Combobox.Input
            id="loading-input"
            placeholder="Task name or assignee..."
            onChange={handleInputChange}
            className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
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
                <Combobox.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                  {loading ? (
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
                  ) : (
                    <Combobox.List className="oy-auto max-h-72 py-1 ow-0">
                      {(item: TaskItem) => (
                        <Combobox.Item
                          key={item.title}
                          value={item.title}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`d-f ai-c g-3 py-2 px-3 mx-1 c-slate-10 br-md fs-sm us-none c-p ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`}
                            >
                              <div
                                className={`d-if ai-c jc-c fs-0 w-8 h-8 c-white br-md fs-xs fw-500 ${item.color}`}
                              >
                                {item.title[0]}
                              </div>
                              <div className="d-f fd-c min-w-0">
                                <span className="o-h fw-500 to-e ws-nw">
                                  {item.title}
                                </span>
                                <span className="o-h c-slate-6 fs-xs to-e ws-nw">
                                  {item.project} · {item.status}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      )}
                    </Combobox.List>
                  )}
                </Combobox.Popup>
              </motion.div>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

interface TaskItem {
  title: string;
  project: string;
  status: string;
  color: string;
}

const tasks: TaskItem[] = [
  {
    title: "Fix navigation bug",
    project: "Storefront Redesign",
    status: "In Progress",
    color: "bg-cyan-5",
  },
  {
    title: "Update API documentation",
    project: "API v3 Migration",
    status: "Active",
    color: "bg-violet-5",
  },
  {
    title: "Design system review",
    project: "Design System",
    status: "Active",
    color: "bg-coral-5",
  },
  {
    title: "Mobile responsive fixes",
    project: "Mobile App",
    status: "In Progress",
    color: "bg-magenta-5",
  },
  {
    title: "Dashboard analytics",
    project: "Analytics Dashboard",
    status: "In Progress",
    color: "bg-indigo-5",
  },
  {
    title: "Auth token refresh",
    project: "Auth Service",
    status: "Active",
    color: "bg-lime-5",
  },
  {
    title: "Invoice generation",
    project: "Billing Portal",
    status: "Backlog",
    color: "bg-blue-5",
  },
];
