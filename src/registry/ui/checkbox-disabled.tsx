import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function ExampleCheckbox() {
  return (
    <div className="d-f fd-c g-2">
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-sm fw-600 c-slate-10 o-50 c-na">
        <Checkbox.Root
          disabled
          defaultChecked
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Checked and disabled
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-sm fw-600 c-slate-10 o-50 c-na">
        <Checkbox.Root
          disabled
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Unchecked and disabled
      </label>
    </div>
  );
}
