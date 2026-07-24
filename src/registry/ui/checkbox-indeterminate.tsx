import { Checkbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "iconoir-react";

export default function CheckboxIndeterminate() {
  return (
    <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
      <Checkbox.Root
        defaultChecked
        className={(state) =>
          `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-1 fv:oc-indigo-5 ${
            state.checked || state.indeterminate
              ? "bg-indigo"
              : "bw-1 bc-silver-3 bg-transparent"
          }`
        }
      >
        <Checkbox.Indicator
          className="d-f c-white"
          render={(props, state) => (
            <span {...props}>
              {state.indeterminate ? (
                <Minus className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        />
      </Checkbox.Root>
      Select all
    </label>
  );
}
