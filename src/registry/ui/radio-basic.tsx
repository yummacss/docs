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
      className="d-f fd-c g-1 ai-fs"
    >
      <div className="fs-sm fw-500 c-slate-11" id={id}>
        Best apple
      </div>

      <label className="d-f ai-c g-2 fs-sm c-slate-12 c-p">
        <Radio.Root
          value="fuji-apple"
          className="d-f ai-c jc-c d-5 br-pill bw-1 bc-silver-4 bg-silver-1 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-2 br-pill bg-silver-1 radio-indicator" />
        </Radio.Root>
        Fuji
      </label>

      <label className="d-f ai-c g-2 fs-sm c-slate-12 c-p">
        <Radio.Root
          value="gala-apple"
          className="d-f ai-c jc-c d-5 br-pill bw-1 bc-silver-4 bg-silver-1 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-2 br-pill bg-silver-1 radio-indicator" />
        </Radio.Root>
        Gala
      </label>

      <label className="d-f ai-c g-2 fs-sm c-slate-12 c-p">
        <Radio.Root
          value="granny-smith-apple"
          className="d-f ai-c jc-c d-5 br-pill bw-1 bc-silver-4 bg-silver-1 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 radio-root"
        >
          <Radio.Indicator className="d-2 br-pill bg-silver-1 radio-indicator" />
        </Radio.Root>
        Granny Smith
      </label>

      <style>{`
        .radio-root[data-checked] {
          background-color: var(--slate-12);
          border-color: var(--slate-12);
        }
        .radio-indicator[data-unchecked] {
          display: none;
        }
      `}</style>
    </RadioGroup>
  );
}
