"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "@gravity-ui/icons";

export default function CheckboxSizes() {
  return (
    <div className="d-f ai-c g-4">
      <label className="d-f ai-c g-2 c-slate-10 fs-xs fw-500">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f w-3 h-3 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
        Small
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
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
        Medium
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-md fw-500">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f w-5 h-5 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
              state.checked
                ? "bg-indigo"
                : "bw-1 bc-silver-3 bg-transparent bs-o-xs"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <Check className="w-4 h-4" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Large
      </label>
    </div>
  );
}
