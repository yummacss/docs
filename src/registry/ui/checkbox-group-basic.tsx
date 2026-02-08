"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { CheckIcon } from "@phosphor-icons/react";
import { useId } from "react";

export default function ExampleCheckboxGroup() {
  const id = useId();

  return (
    <CheckboxGroup
      aria-labelledby={id}
      defaultValue={["email"]}
      className="d-f fd-c g-2 ai-fs c-slate-10"
    >
      <div className="fw-600 fs-sm" id={id}>
        Notifications
      </div>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="email"
          className={(state) =>
            `d-f d-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Email alerts
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="sms"
          className={(state) =>
            `d-f d-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        SMS alerts
      </label>

      <label className="d-f ai-c g-2 fs-sm fw-600">
        <Checkbox.Root
          name="notifications"
          value="push"
          className={(state) =>
            `d-f d-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
              state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
            }`
          }
        >
          <Checkbox.Indicator className="d-f c-white">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Push notifications
      </label>
    </CheckboxGroup>
  );
}
