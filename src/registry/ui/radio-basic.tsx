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
      className="d-f fd-c ai-fs g-1 c-slate"
    >
      <div className="fw-500" id={id}>
        Best apple
      </div>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="fuji-apple"
          className="d-f w-5 h-5 ai-c jc-c br-full ow-0 p-0 m-0 bw-0 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Fuji
      </label>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="gala-apple"
          className="d-f w-5 h-5 ai-c jc-c br-full ow-0 p-0 m-0 bw-0 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Gala
      </label>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2">
        <Radio.Root
          value="granny-smith-apple"
          className="d-f w-5 h-5 ai-c jc-c br-full ow-0 p-0 m-0 bw-0 radio-root"
        >
          <Radio.Indicator className="d-f ai-c jc-c radio-indicator" />
        </Radio.Root>
        Granny Smith
      </label>

      <style>{`
        .radio-root[data-unchecked] {
          border: 1px solid var(--silver-4);
          background-color: transparent;
        }
        .radio-root[data-checked] {
          background-color: var(--slate);
        }
        .radio-root:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: 2px;
        }
        .radio-indicator[data-unchecked] {
          display: none;
        }
        .radio-indicator::before {
          content: '';
          border-radius: 100%;
          width: 0.5rem;
          height: 0.5rem;
          background-color: var(--silver-1);
        }
      `}</style>
    </RadioGroup>
  );
}
