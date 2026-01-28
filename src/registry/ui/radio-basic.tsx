"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import * as React from "react";

export default function ExampleRadio() {
  const id = React.useId();
  return (
    <RadioGroup
      aria-labelledby={id}
      defaultValue="fuji-apple"
      className="d-f fd-c g-1 ai-fs c-slate-12"
    >
      <div className="fw-500" id={id}>
        Best apple
      </div>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="fuji-apple"
          className="d-f ai-c jc-c w-5 h-5 br-full bw-0 bg-transparent p-0 m-0 ow-0 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Fuji
      </label>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="gala-apple"
          className="d-f ai-c jc-c w-5 h-5 br-full bw-0 bg-transparent p-0 m-0 ow-0 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Gala
      </label>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="granny-smith-apple"
          className="d-f ai-c jc-c w-5 h-5 br-full bw-0 bg-transparent p-0 m-0 ow-0 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Granny Smith
      </label>

      <style>{`
        .radio-root[data-unchecked] {
          border: 1px solid #dadcdf;
          background-color: transparent;
        }
        .radio-root[data-checked] {
          background-color: #0a0a0c;
        }
        .radio-indicator[data-unchecked] {
          display: none;
        }
        .radio-indicator::before {
          content: '';
          border-radius: 100%;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #f5f5f6;
        }
      `}</style>
    </RadioGroup>
  );
}
