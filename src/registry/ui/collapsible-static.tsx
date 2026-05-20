"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import {
  ChevronRight,
  Circle,
  CircleDashed,
  CircleQuestionMark,
} from "lucide-react";
import { useState } from "react";

export default function CollapsibleStatic() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 c-slate-10"
    >
      <Collapsible.Trigger className="d-f ai-c jc-sb g-3 w-100% py-3 px-3 bg-white bc-silver-3 bbw-1 ta-l c-p h:bg-silver-1/50">
        <span className="c-slate-8 fs-sm fw-500">Implement user dashboard</span>
        <ChevronRight
          className={`w-4 h-4 c-slate-5 tp-t tdu-150 ttf-io ${open ? "ro-90" : "ro-0"}`}
        />
      </Collapsible.Trigger>

      <Collapsible.Panel
        className={`d-b o-h tp-all tdu-200 ttf-io ${open ? "h-auto o-1" : "h-0 o-0"}`}
      >
        <div className="d-f fd-c px-3 py-2">
          {tasks.map((task) => (
            <div key={task.id} className="d-f ai-c g-2 py-2">
              {task.status === "done" ? (
                <CircleQuestionMark className="w-4 h-4 c-mint" />
              ) : task.status === "in-progress" ? (
                <CircleDashed className="w-4 h-4 c-yellow" />
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
