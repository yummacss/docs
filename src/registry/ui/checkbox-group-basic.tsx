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
      defaultValue={["fuji-apple"]}
      className="d-f fd-c g-1 ai-fs c-slate-12"
    >
      <div className="fw-500" id={id}>
        Apples
      </div>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input */}
      <label className="d-f ai-c g-2">
        <Checkbox.Root
          name="apple"
          value="fuji-apple"
          className="d-f d-5 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 checkbox-group-root"
        >
          <Checkbox.Indicator className="d-f c-silver-1">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Fuji
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input */}
      <label className="d-f ai-c g-2">
        <Checkbox.Root
          name="apple"
          value="gala-apple"
          className="d-f d-5 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 checkbox-group-root"
        >
          <Checkbox.Indicator className="d-f c-silver-1">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Gala
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input */}
      <label className="d-f ai-c g-2">
        <Checkbox.Root
          name="apple"
          value="granny-smith-apple"
          className="d-f d-5 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 checkbox-group-root"
        >
          <Checkbox.Indicator className="d-f c-silver-1">
            <CheckIcon size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Granny Smith
      </label>

      <style>{`
        .checkbox-group-root[data-unchecked] {
          border: 1px solid #dadcdf;
          background-color: transparent;
        }
        .checkbox-group-root[data-checked] {
          background-color: #0a0a0c;
        }
      `}</style>
    </CheckboxGroup>
  );
}
