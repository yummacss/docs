"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";

export default function RadioDescriptions() {
  return (
    <RadioGroup defaultValue="free" className="d-f fd-c g-3 ai-fs">
      <label className="d-f fd-c g-1 c-slate-10 fs-sm fw-500 c-p">
        <div className="d-f ai-c g-2">
          <Radio.Root
            value="free"
            className={(state) =>
              `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
                state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
              } fv:ow-2 fv:oo-2 fv:oc-indigo-5`
            }
          >
            <Radio.Indicator
              className={(state) =>
                state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
              }
            />
          </Radio.Root>
          <span>Free plan</span>
        </div>
        <p className="pl-6 c-slate-6 fs-xs fw-400">Perfect for hobbyists</p>
      </label>

      <label className="d-f fd-c g-1 c-slate-10 fs-sm fw-500 c-p">
        <div className="d-f ai-c g-2">
          <Radio.Root
            value="pro"
            className={(state) =>
              `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
                state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
              } fv:ow-2 fv:oo-2 fv:oc-indigo-5`
            }
          >
            <Radio.Indicator
              className={(state) =>
                state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
              }
            />
          </Radio.Root>
          <span>Pro plan</span>
        </div>
        <p className="pl-6 c-slate-6 fs-xs fw-400">For serious users</p>
      </label>

      <label className="d-f fd-c g-1 c-slate-10 fs-sm fw-500 c-p">
        <div className="d-f ai-c g-2">
          <Radio.Root
            value="max"
            className={(state) =>
              `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
                state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
              } fv:ow-2 fv:oo-2 fv:oc-indigo-5`
            }
          >
            <Radio.Indicator
              className={(state) =>
                state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
              }
            />
          </Radio.Root>
          <span>Max plan</span>
        </div>
        <p className="pl-6 c-slate-6 fs-xs fw-400">Maximum power</p>
      </label>
    </RadioGroup>
  );
}
