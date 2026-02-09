import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function ExampleCheckbox() {
  return (
    <div className="d-f ai-c g-4">
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-xs fw-600 c-slate-10">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f d-3 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={10} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Small
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-sm fw-600 c-slate-10">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f d-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Medium
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-md fw-600 c-slate-10">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f d-5 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={14} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Large
      </label>
    </div>
  );
}
