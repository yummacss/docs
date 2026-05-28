"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { KanbanBoard, List, Plus, Sort, Table, Wrench } from "iconoir-react";
import { useState } from "react";

export default function ToolbarSquircle() {
  const [view, setView] = useState<string[]>(["grid"]);

  return (
    <Toolbar.Root className="d-f ai-c g-1 p-2 bg-white bc-silver-2 br-3xl cs-s bw-1">
      <ToggleGroup
        className="d-f g-1"
        value={view}
        onValueChange={(v) => setView(v)}
        aria-label="View"
      >
        <Toggle
          value="grid"
          aria-label="Grid"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-xxl cs-s us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Table className="w-5 h-5" />
        </Toggle>
        <Toggle
          value="list"
          aria-label="List"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-xxl cs-s us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <List className="w-5 h-5" />
        </Toggle>
        <Toggle
          value="kanban"
          aria-label="Kanban"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-xxl cs-s us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <KanbanBoard className="w-5 h-5" />
        </Toggle>
      </ToggleGroup>

      <Toolbar.Separator className="w-px h-5 mx-1 bg-silver-3" />

      <Toolbar.Group className="d-f g-1" aria-label="Actions">
        <Toolbar.Button className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent c-slate-8 br-xxl cs-s bw-0 fs-sm fw-500 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
          <Plus className="w-5 h-5" />
          New Task
        </Toolbar.Button>
        <Toolbar.Button className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent c-slate-8 br-xxl cs-s bw-0 fs-sm fw-500 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
          <Sort className="w-5 h-5" />
          Sort
        </Toolbar.Button>
        <Toolbar.Button className="d-f ai-c g-1 jc-c h-9 px-3 bg-transparent c-slate-8 br-xxl cs-s bw-0 fs-sm fw-500 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5">
          <Wrench className="w-5 h-5" />
          Settings
        </Toolbar.Button>
      </Toolbar.Group>

      <Toolbar.Separator className="w-px h-5 mx-1 bg-silver-3" />

      <Toolbar.Input
        className="h-9 w-40 pl-3 bg-transparent bw-0 br-xxl cs-s fs-sm fv:oo-2 fv:oc-indigo-3"
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
    </Toolbar.Root>
  );
}
