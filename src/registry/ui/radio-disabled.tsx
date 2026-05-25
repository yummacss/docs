"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function RadioDisabled() {
  return (
    <RadioGroup defaultValue="free" className="d-f fd-c g-3 ai-fs">
      <label className="d-f fd-c g-1 c-slate-10 fs-sm fw-500 c-p">
        <div className="d-f ai-c g-2">
          <Radio.Root
            value="free"
            className={(state) =>
              `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
                state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
              } fv:oo-2 fv:oc-indigo-5`
            }
            render={(props, _) => (
              <motion.span
                {...(props as HTMLMotionProps<"span">)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Radio.Indicator
                  className={(state) =>
                    state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                  }
                />
              </motion.span>
            )}
          />
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
              } fv:oo-2 fv:oc-indigo-5`
            }
            render={(props, _) => (
              <motion.span
                {...(props as HTMLMotionProps<"span">)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Radio.Indicator
                  className={(state) =>
                    state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                  }
                />
              </motion.span>
            )}
          />
          <span>Pro plan</span>
        </div>
        <p className="pl-6 c-slate-6 fs-xs fw-400">For serious users</p>
      </label>

      <label className="d-f fd-c g-1 c-slate-6 fs-sm o-50 c-na">
        <div className="d-f ai-c g-2">
          <Radio.Root
            value="max"
            disabled
            className={(state) =>
              `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
                state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
              }`
            }
            render={(props, _) => (
              <motion.span
                {...(props as HTMLMotionProps<"span">)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Radio.Indicator
                  className={(state) =>
                    state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                  }
                />
              </motion.span>
            )}
          />
          <span>Max plan</span>
        </div>
        <p className="pl-6 c-slate-6 fs-xs fw-400">Maximum power</p>
      </label>
    </RadioGroup>
  );
}
