import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "iconoir-react";

export default function CheckboxOutset() {
  return (
    <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
      <Checkbox.Root
        defaultChecked
        className={(state) =>
          `d-f w-4 h-4 ai-c jc-c br-sm fv:oo-2 fv:oc-indigo-5 ${
            state.checked
              ? "bg-indigo"
              : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
          }`
        }
      >
        <Checkbox.Indicator className="d-f c-white">
          <Check className="w-3 h-3" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      Mark task as complete
    </label>
  );
}
