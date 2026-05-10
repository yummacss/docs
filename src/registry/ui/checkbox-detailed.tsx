"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "@gravity-ui/icons";

export default function CheckboxDetailed() {
  return (
    <div className="d-f fd-c g-3">
      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
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
          Manage labels
        </div>
        <span className="ml-6 c-slate-8 fs-xs">
          Create, edit, or delete task labels
        </span>
      </label>

      <label className="d-f fd-c g-1">
        <div className="d-f ai-c g-2 c-slate-10 fs-sm fw-500">
          <Checkbox.Root
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
          Manage priorities
        </div>
        <span className="ml-6 c-slate-8 fs-xs">
          Create, edit, or delete task priorities
        </span>
      </label>
    </div>
  );
}
