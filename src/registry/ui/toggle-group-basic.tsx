import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";

export default function ExampleToggleGroup() {
  return (
    <ToggleGroup
      defaultValue={["left"]}
      className="d-f g-px br-1 bw-1 bc-silver-4 bg-silver-1 p-px"
    >
      <Toggle
        aria-label="Align left"
        value="left"
        className="d-f d-8 ai-c jc-c br-1 c-slate-6 us-none h:bg-silver-2 a:bg-silver-3 toggle-button"
      >
        <TextAlignLeftIcon size={16} />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className="d-f d-8 ai-c jc-c br-1 c-slate-6 us-none h:bg-silver-2 a:bg-silver-3 toggle-button"
      >
        <TextAlignCenterIcon size={16} />
      </Toggle>
      <Toggle
        aria-label="Align right"
        value="right"
        className="d-f d-8 ai-c jc-c br-1 c-slate-6 us-none h:bg-silver-2 a:bg-silver-3 toggle-button"
      >
        <TextAlignRightIcon size={16} />
      </Toggle>

      <style>{`
        .toggle-button {
          border: 0;
          background-color: transparent;
        }
        .toggle-button:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
        .toggle-button[data-pressed] {
          background-color: var(--silver-2);
          color: var(--slate);
        }
      `}</style>
    </ToggleGroup>
  );
}
