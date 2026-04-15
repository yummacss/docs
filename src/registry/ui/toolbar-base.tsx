"use client";

import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { Bold, Italic, Strikethrough, Underline } from "@gravity-ui/icons";

export default function ToolbarBase() {
  return (
    <Toolbar.Root className="d-f ai-c g-1 p-1 bg-white bc-silver-2 br-md bw-1">
      <ToggleGroup className="d-f g-1" aria-label="Text formatting">
        <Toggle
          aria-label="Bold"
          value="bold"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-sm us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Bold className="w-5 h-5" />
        </Toggle>
        <Toggle
          aria-label="Italic"
          value="italic"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-sm us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Italic className="w-5 h-5" />
        </Toggle>
        <Toggle
          aria-label="Underline"
          value="underline"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-sm us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Underline className="w-5 h-5" />
        </Toggle>
        <Toggle
          aria-label="Strikethrough"
          value="strikethrough"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-sm us-none c-p fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <Strikethrough className="w-5 h-5" />
        </Toggle>
      </ToggleGroup>

      <Separator orientation="vertical" className="w-px h-5 bg-silver-3" />

      <Toolbar.Group className="d-f g-1" aria-label="Actions">
        <Toolbar.Button className="d-f ai-c jc-c h-9 px-3 bg-transparent c-slate-8 br-sm bw-0 fs-sm fw-600 us-none c-p h:bg-silver-1 h:c-slate-10 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Undo
        </Toolbar.Button>
        <Toolbar.Button className="d-f ai-c jc-c h-9 px-3 bg-transparent c-slate-8 br-sm bw-0 fs-sm fw-600 us-none c-p h:bg-silver-1 h:c-slate-10 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Redo
        </Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>
  );
}
