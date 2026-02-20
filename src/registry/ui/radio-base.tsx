"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import * as React from "react";

export default function ExampleRadio() {
  const id = React.useId();
  return (
    <RadioGroup
      aria-labelledby={id}
      defaultValue="monthly"
      className="d-f fd-c g-2 ai-fs"
    >
      <div className="fs-md fw-600 c-slate-10" id={id}>
        Billing cycle
      </div>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2 fs-sm c-slate-10 c-p">
        <Radio.Root
          value="monthly"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-pill p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6`
          }
        >
          <Radio.Indicator
            className={(state) =>
              state.checked ? "w-2 h-2 br-pill bg-white" : "d-none"
            }
          />
        </Radio.Root>
        Monthly
      </label>

      {/* biome-ignore lint: Radio.Root contains hidden input */}
      <label className="d-f ai-c g-2 fs-sm c-slate-10 c-p">
        <Radio.Root
          value="yearly"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-pill p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6`
          }
        >
          <Radio.Indicator
            className={(state) =>
              state.checked ? "w-2 h-2 br-pill bg-white" : "d-none"
            }
          />
        </Radio.Root>
        Yearly
      </label>
    </RadioGroup>
  );
}
