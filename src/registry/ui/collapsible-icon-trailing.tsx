"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { Circle, DoubleCheck, Minus, Plus, SystemRestart } from "iconoir-react";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function CollapsibleIcons() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 c-slate-10"
    >
      <Collapsible.Trigger className="d-f ai-c jc-sb g-3 w-100% py-3 px-3 bg-white bc-silver-3 bbw-1 ta-l c-p fv:oo-1 fv:oc-indigo-5">
        <span className="c-slate-8 fs-sm fw-500">Implement user dashboard</span>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="d-f"
        >
          {open ? (
            <Minus className="w-4 h-4 c-slate-5" aria-hidden />
          ) : (
            <Plus className="w-4 h-4 c-slate-5" aria-hidden />
          )}
        </motion.span>
      </Collapsible.Trigger>

      <Collapsible.Panel
        keepMounted
        render={(props) => (
          <motion.div
            {...(props as HTMLMotionProps<"div">)}
            initial={false}
            animate={
              open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="d-b o-h"
          />
        )}
      >
        <div className="d-f fd-c px-3 py-2">
          {tasks.map((task) => (
            <div key={task.id} className="d-f ai-c g-2 py-2">
              {task.status === "done" ? (
                <DoubleCheck className="w-4 h-4 c-mint" />
              ) : task.status === "in-progress" ? (
                <SystemRestart className="w-4 h-4 c-yellow" />
              ) : (
                <Circle className="w-4 h-4 c-slate-4" />
              )}
              <span
                className={`fs-sm ${
                  task.status === "done" ? "c-slate-5 tdl-lt" : "c-slate-8"
                }`}
              >
                {task.name}
              </span>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const tasks = [
  { id: 1, name: "Design wireframes", status: "done" },
  { id: 2, name: "Set up API routes", status: "done" },
  { id: 3, name: "Build chart component", status: "in-progress" },
  { id: 4, name: "Write integration tests", status: "todo" },
  { id: 5, name: "Deploy to staging", status: "todo" },
];
