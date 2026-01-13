import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function CheckboxBasic() {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input
    <label className="d-f ai-c g-2 fs-sm c-slate">
      <Checkbox.Root
        defaultChecked
        className="d-f ai-c jc-c d-5 br-0 bw-1 bc-silver-4 bg-white f:oc-slate-4 f:os-s f:ow-2 checkbox-root"
      >
        <Checkbox.Indicator className="d-f c-black">
          <CheckIcon size={12} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      Enable notifications
      <style>{`
        .checkbox-root[data-checked] {
          background-color: var(--slate-8);
          border-color: var(--slate-8);
        }
      `}</style>
    </label>
  );
}
