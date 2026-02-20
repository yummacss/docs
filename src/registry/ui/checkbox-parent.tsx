"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { useId, useState } from "react";

const permissions = ["read", "write", "delete"];

export default function ExampleCheckboxGroup() {
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
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
      <label className="d-f ai-c g-2 fs-sm fw-600" id={id}>
        <Checkbox.Root
          name="permissions"
          parent
          className={(state) =>
            `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
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
                  <MinusIcon size={12} weight="bold" />
                ) : (
                  <CheckIcon size={12} weight="bold" />
                )}
              </span>
            )}
          />
        </Checkbox.Root>
        All permissions
      </label>

      <div className="d-f fd-c g-2 ml-6">
        {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="read"
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
              }`
            }
          >
            <Checkbox.Indicator className="d-f c-white">
              <CheckIcon size={12} weight="bold" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Read
        </label>

        {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="write"
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
              }`
            }
          >
            <Checkbox.Indicator className="d-f c-white">
              <CheckIcon size={12} weight="bold" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Write
        </label>

        {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI handles this */}
        <label className="d-f ai-c g-2 fs-sm fw-600">
          <Checkbox.Root
            value="delete"
            className={(state) =>
              `d-f w-4 h-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                state.checked ? "bg-indigo" : "bw-1 bc-silver-3 bg-transparent"
              }`
            }
          >
            <Checkbox.Indicator className="d-f c-white">
              <CheckIcon size={12} weight="bold" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Delete
        </label>
      </div>
    </CheckboxGroup>
  );
}
