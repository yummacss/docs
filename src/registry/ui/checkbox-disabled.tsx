"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "@gravity-ui/icons";

export default function CheckboxDisabled() {
  return (
    <div className="d-f fd-c g-2">
      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-600 o-50 c-na">
        <Checkbox.Root
          disabled
          defaultChecked
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <Check className="w-3 h-3" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Administrator
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-600 o-50 c-na">
        <Checkbox.Root
          disabled
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <Check className="w-3 h-3" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Manage messages
      </label>
    </div>
  );
}
