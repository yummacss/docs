"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check } from "iconoir-react";
import { useId } from "react";

export default function CheckboxGroupLabel() {
  const id = useId();

  return (
    <CheckboxGroup
      aria-labelledby={id}
      defaultValue={["email"]}
      className="d-f fd-c g-2 ai-fs c-slate-10"
    >
      <div className="fw-500 fs-sm" id={id}>
        Task actions
      </div>

      <label className="d-f ai-c g-2 fs-sm fw-500">
        <Checkbox.Root
          name="notifications"
          value="email"
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
        Edit task
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-500">
        <Checkbox.Root
          name="notifications"
          value="sms"
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
        Delete task
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-500">
        <Checkbox.Root
          name="notifications"
          value="push"
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
        Assign member
      </label>
    </CheckboxGroup>
  );
}
