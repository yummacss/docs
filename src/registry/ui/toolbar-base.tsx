import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import {
  TextBolderIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";

export default function ExampleToolbar() {
  return (
    <Toolbar.Root className="d-f ai-c g-1 p-1 bg-white bc-silver-2 br-2 bw-1">
      <ToggleGroup className="d-f g-1" aria-label="Text formatting">
        <Toggle
          aria-label="Bold"
          value="bold"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <TextBolderIcon size={18} weight="bold" />
        </Toggle>
        <Toggle
          aria-label="Italic"
          value="italic"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <TextItalicIcon size={18} weight="bold" />
        </Toggle>
        <Toggle
          aria-label="Underline"
          value="underline"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <TextUnderlineIcon size={18} weight="bold" />
        </Toggle>
        <Toggle
          aria-label="Strikethrough"
          value="strikethrough"
          className={(state) =>
            `d-f w-9 h-9 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.pressed
                ? "bg-indigo c-white"
                : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
            }`
          }
        >
          <TextStrikethroughIcon size={18} weight="bold" />
        </Toggle>
      </ToggleGroup>

      <Separator orientation="vertical" className="w-px h-5 bg-silver-3" />

      <Toolbar.Group className="d-f g-1" aria-label="Actions">
        <Toolbar.Button className="d-f ai-c jc-c h-9 px-3 bg-transparent c-slate-8 br-1 bw-0 fs-sm fw-600 us-none c-p h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Undo
        </Toolbar.Button>
        <Toolbar.Button className="d-f ai-c jc-c h-9 px-3 bg-transparent c-slate-8 br-1 bw-0 fs-sm fw-600 us-none c-p h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6">
          Redo
        </Toolbar.Button>
      </Toolbar.Group>
    </Toolbar.Root>
  );
}
