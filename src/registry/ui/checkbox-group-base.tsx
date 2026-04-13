"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check } from "@gravity-ui/icons";
import { useId } from "react";

export default function CheckboxGroupBase() {
  const id = useId();

  return (
    <CheckboxGroup
      aria-labelledby={id}
      defaultValue={["email"]}
      className="d-f fd-c g-2 ai-fs c-slate-10"
    >
      <div className="fw-600 fs-sm" id={id}>
        Permissions
      </div>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="email"
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
        Kick members
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="sms"
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
        Ban members
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="push"
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
    </CheckboxGroup>
  );
}
