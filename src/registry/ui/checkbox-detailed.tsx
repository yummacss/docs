import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function ExampleCheckbox() {
  return (
    <div className="d-f fd-c g-3">
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 fs-sm fw-600 c-slate-10">
          <Checkbox.Root
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
          Enable notifications
        </div>
        <span className="fs-xs c-slate-8 ml-6">
          Receive email updates about your account activity
        </span>
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 fs-sm fw-600 c-slate-10">
          <Checkbox.Root
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
          Marketing emails
        </div>
        <span className="fs-xs c-slate-8 ml-6">
          Get the latest news and special offers
        </span>
      </label>
    </div>
  );
}
