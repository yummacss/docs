"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { ArrowDownAZ, Cog, Kanban, LayoutList, Plus, Table } from "lucide-react";
import { useState } from "react";

export default function ToolbarIconOnly() {
  const [view, setView] = useState<string[]>(["grid"]);

  return (
    <Toolbar.Root className="d-f ai-c g-1 p-2 bg-white bc-silver-2 br-lg bw-1">
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
            `d-f w-9 h-9 ai-c jc-c bw-0 br-md us-none c-p fv:oo-2 fv:oc-indigo-3 ${
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
            `d-f w-9 h-9 ai-c jc-c bw-0 br-md us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <LayoutList className="w-5 h-5" />
        </Toggle>
        <Toggle
          value="kanban"
          aria-label="Kanban"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-md us-none c-p fv:oo-2 fv:oc-indigo-3 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Kanban className="w-5 h-5" />
        </Toggle>
      </ToggleGroup>

      <Toolbar.Separator className="w-px h-5 bg-silver-3" />

      <Toolbar.Group className="d-f g-1" aria-label="Actions">
        <Toolbar.Button
          aria-label="New Task"
          className="d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-8 br-md bw-0 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
        >
          <Plus className="w-5 h-5" />
        </Toolbar.Button>
        <Toolbar.Button
          aria-label="Sort"
          className="d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-8 br-md bw-0 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
        >
          <ArrowDownAZ className="w-5 h-5" />
        </Toolbar.Button>
        <Toolbar.Button
          aria-label="Settings"
          className="d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-8 br-md bw-0 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
        >
          <Cog className="w-5 h-5" />
        </Toolbar.Button>
      </Toolbar.Group>

      <Toolbar.Separator className="w-px h-5 bg-silver-3" />

      <Toolbar.Input
        className="h-9 w-40 pl-3 bg-transparent bw-0 br-md fs-sm fv:oo-2 fv:oc-indigo-3"
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
    </Toolbar.Root>
  );
}
