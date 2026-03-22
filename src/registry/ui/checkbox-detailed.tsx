import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";

export default function ExampleCheckbox() {
  return (
    <div className="d-f fd-c g-3">
      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 c-slate-10 fs-sm fw-600">
          <Checkbox.Root
            defaultChecked
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
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
        <span className="ml-6 c-slate-8 fs-xs">
          Receive email updates about your account activity
        </span>
      </label>

      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 c-slate-10 fs-sm fw-600">
          <Checkbox.Root
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
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
        <span className="ml-6 c-slate-8 fs-xs">
          Get the latest news and special offers
        </span>
      </label>
    </div>
  );
}
