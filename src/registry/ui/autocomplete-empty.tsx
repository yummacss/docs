"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteEmpty() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredTasks = query.trim()
    ? tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    : tasks;

  return (
    <Autocomplete.Root
      items={tasks}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="d-f fd-c g-2">
        <label htmlFor="empty-input" className="c-slate-10 fs-sm fw-500">
          Search tasks
        </label>
        <Autocomplete.Input
          id="empty-input"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 0) setOpen(true);
          }}
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-5"
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
                <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                  {filteredTasks.length > 0 ? (
                    <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                      {(task: Task) => (
                        <Autocomplete.Item
                          key={task.title}
                          value={task.title}
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
                                className={`d-if ai-c jc-c w-6 h-6 br-sm fs-xs fw-500 c-white ${task.priority}`}
                              >
                                {task.title[0]}
                              </span>
                              <div className="d-f fd-c">
                                <span className="fw-500">{task.title}</span>
                                <span className="c-slate-6 fs-xs">
                                  {task.status}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      )}
                    </Autocomplete.List>
                  ) : (
                    <div className="py-4 px-4">
                      <span className="c-slate-6 fs-sm">No tasks found.</span>
                    </div>
                  )}
                </Autocomplete.Popup>
              </motion.div>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Task {
  title: string;
  status: string;
  priority: string;
}

const tasks: Task[] = [
  { title: "Review design mockups", status: "In Progress", priority: "bg-cyan-5" },
  { title: "Update API documentation", status: "Backlog", priority: "bg-slate-5" },
  { title: "Fix authentication bug", status: "Urgent", priority: "bg-red-5" },
  { title: "Optimize database queries", status: "In Review", priority: "bg-mint-5" },
  { title: "Write unit tests", status: "Todo", priority: "bg-sky-5" },
  { title: "Deploy to staging", status: "Done", priority: "bg-green-5" },
];