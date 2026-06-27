"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { KanbanBoard, List, Plus, Sort, Table, Wrench } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ToolbarDisabled() {
  const [view, setView] = useState<string[]>(["grid"]);

  return (
    <Toolbar.Root className="d-f ai-c g-1 p-2 bg-white bc-silver-2 br-xxl bw-1">
      <ToggleGroup
        className="d-f g-1"
        value={view}
        onValueChange={(v) => setView(v)}
        aria-label="View"
      >
        <Toggle
          value="grid"
          aria-label="Grid"
          render={(props, state) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.92 }}
              className={`d-f w-9 h-9 ai-c jc-c bw-0 br-lg us-none c-p fv:oo-2 fv:oc-indigo-3 ${
                state.pressed
                  ? "bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1"
                  : "bg-transparent c-slate-7 h:bg-silver-1 h:c-slate-10"
              }`}
            >
              <Table className="w-5 h-5" />
            </motion.button>
          )}
        />
        <Toggle
          value="list"
          aria-label="List"
          render={(props, state) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.92 }}
              className={`d-f w-9 h-9 ai-c jc-c bw-0 br-lg us-none c-p fv:oo-2 fv:oc-indigo-3 ${
                state.pressed
                  ? "bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1"
                  : "bg-transparent c-slate-7 h:bg-silver-1 h:c-slate-10"
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          )}
        />
        <Toggle
          value="kanban"
          aria-label="Kanban"
          render={(props, state) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.92 }}
              className={`d-f w-9 h-9 ai-c jc-c bw-0 br-lg us-none c-p fv:oo-2 fv:oc-indigo-3 ${
                state.pressed
                  ? "bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1"
                  : "bg-transparent c-slate-7 h:bg-silver-1 h:c-slate-10"
              }`}
            >
              <KanbanBoard className="w-5 h-5" />
            </motion.button>
          )}
        />
      </ToggleGroup>

      <Toolbar.Separator className="w-px h-5 mx-1 bg-silver-2" />

      <Toolbar.Button
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.92 }}
            className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent c-slate-7 br-lg bw-0 fs-sm fw-500 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
          />
        )}
      >
        <Plus className="w-5 h-5" />
        New Task
      </Toolbar.Button>
      <Toolbar.Button
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.92 }}
            className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent c-slate-7 br-lg bw-0 fs-sm fw-500 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
          />
        )}
      >
        <Sort className="w-5 h-5" />
        Sort
      </Toolbar.Button>
      <Toolbar.Button
        disabled
        render={(props) => (
          <motion.button
            type="button"
            {...(props as HTMLMotionProps<"button">)}
            className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent h:bg-transparent c-slate-7/50 br-lg bw-0 fs-sm fw-500 us-none c-na o-50"
          />
        )}
      >
        <Wrench className="w-5 h-5" />
        Settings
      </Toolbar.Button>

      <Toolbar.Separator className="w-px h-5 mx-1 bg-silver-2" />

      <Toolbar.Input
        className="h-9 w-40 pl-3 bg-transparent bw-0 br-lg fs-sm fv:oo-2 fv:oc-indigo-3"
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
    </Toolbar.Root>
  );
}
