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
        className="d-f d-8 ai-c jc-c b-0 br-1 bg-transparent c-slate-6 us-none h:bg-silver-2 fv:bc-transparent fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
      >
        <TextAlignLeftIcon size={16} />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className="d-f d-8 ai-c jc-c b-0 br-1 bg-transparent c-slate-6 us-none h:bg-silver-2 fv:bc-transparent fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
      >
        <TextAlignCenterIcon size={16} />
      </Toggle>
      <Toggle
        aria-label="Align right"
        value="right"
        className="d-f d-8 ai-c jc-c b-0 br-1 bg-transparent c-slate-6 us-none h:bg-silver-2 fv:bc-transparent fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 a:bg-silver-3 data-pressed:bg-silver-2 data-pressed:c-slate-12"
      >
        <TextAlignRightIcon size={16} />
      </Toggle>
    </ToggleGroup>
  );
}
