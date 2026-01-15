import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function ExampleCheckbox() {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input
    <label className="d-f ai-c g-2 fs-md c-slate">
      <Checkbox.Root
        defaultChecked
        className="d-f d-5 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 checkbox-root"
      >
        <Checkbox.Indicator className="d-f c-silver-1">
          <CheckIcon size={12} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      Enable notifications
      <style>{`
        .checkbox-root[data-unchecked] {
          border: 1px solid var(--silver-4);
          background-color: transparent;
        }
        .checkbox-root[data-checked] {
          background-color: var(--slate);
        }
      `}</style>
    </label>
  );
}
