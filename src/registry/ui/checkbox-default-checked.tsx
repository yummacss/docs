"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "@gravity-ui/icons";

export default function CheckboxDefaultChecked() {
  return (
    <div className="d-f fd-c">
      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
        <Checkbox.Root
          defaultChecked
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-sm fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
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
        Subscribe to newsletter
      </label>
      <span className="c-slate-6 fs-xs ml-6">
        Get 10% off your next order and exclusive deals
      </span>
    </div>
  );
}