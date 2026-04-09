"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check, Minus } from "@gravity-ui/icons";
import { useId, useState } from "react";

export default function CheckboxParent() {
  const id = useId();
  const [value, setValue] = useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={value}
      onValueChange={setValue}
      allValues={permissions}
      className="d-f fd-c g-2 c-slate-10"
    >
      <label className="d-f ai-c g-2 fs-sm fw-600" id={id}>
        <Checkbox.Root
          name="permissions"
          parent
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
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
        All permissions
      </label>

      <div className="d-f fd-c g-2 ml-6">
        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="read"
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
          Read
        </label>

        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="write"
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
          Write
        </label>

        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="delete"
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
          Delete
        </label>
      </div>
    </CheckboxGroup>
  );
}

const permissions = ["read", "write", "delete"];
