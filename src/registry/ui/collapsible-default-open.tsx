"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function CollapsibleDefaultOpen() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root defaultOpen className="d-f fd-c w-72 c-slate-10 br-xl">
      <Collapsible.Trigger
        className="d-f ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fs-sm fw-500 c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5"
        onClick={() => setOpen(!open)}
      >
        <span className="c-slate-9 fs-sm fw-500">Sprint status</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <ChevronRight className="w-3 h-3" />
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
        <div className="d-f fd-c g-3 mt-1 py-3 px-3 bg-white bc-silver-2 br-xl bw-1">
          {sprintStatus.map((sprint) => (
            <div key={sprint.id} className="d-f ai-c jc-sb">
              <div className="d-f fd-c g-0">
                <span className="c-slate-10 fs-sm fw-500">{sprint.name}</span>
                <span className="c-slate-6 fs-xs">{sprint.dates}</span>
              </div>
              <span
                className={`d-f ai-c g-1 px-2 py-0 h-6 ${sprint.bg} ${sprint.text} br-9999 fs-xs fw-500`}
              >
                {sprint.status}
              </span>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const sprintStatus = [
  {
    id: "sprint-1",
    name: "Sprint 1",
    dates: "Mar 1 - Mar 14",
    status: "Completed",
    bg: "bg-green-1 bc-green-2",
    text: "c-green-7",
  },
  {
    id: "sprint-2",
    name: "Sprint 2",
    dates: "Mar 15 - Mar 28",
    status: "Active",
    bg: "bg-indigo-1 bc-indigo-2",
    text: "c-indigo-7",
  },
  {
    id: "sprint-3",
    name: "Sprint 3",
    dates: "Mar 29 - Apr 11",
    status: "Planned",
    bg: "bg-silver-1 bc-silver-2",
    text: "c-slate-7",
  },
];
