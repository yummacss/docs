"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { KanbanBoard, List, Minus, Plus, Table } from "iconoir-react";
import { useState } from "react";

export default function ToolbarInput() {
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
          <List className="w-5 h-5" />
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
          <KanbanBoard className="w-5 h-5" />
        </Toggle>
      </ToggleGroup>

      <Toolbar.Separator className="w-px h-5 mx-1 bg-silver-3" />

      <NumberField.Root defaultValue={8} aria-label="Sprint points">
        <NumberField.Group className="d-f ai-c">
          <NumberField.Decrement className="d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-8 br-md bw-0 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-3">
            <Minus className="w-5 h-5" />
          </NumberField.Decrement>
          <Toolbar.Input
            render={<NumberField.Input />}
            className="w-16 bg-transparent c-slate-10 bw-0 ta-c fs-sm fw-500 fv:oo-2 fv:oc-indigo-3"
          />
          <NumberField.Increment className="d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-8 br-md bw-0 us-none c-p h:bg-silver-1 h:c-slate-10 fv:oo-2 fv:oc-indigo-3">
            <Plus className="w-5 h-5" />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </Toolbar.Root>
  );
}
