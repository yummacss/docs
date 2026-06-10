"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useId } from "react";

export default function RadioSquircle() {
  const id = useId();
  return (
    <RadioGroup
      aria-labelledby={id}
      defaultValue="free"
      className="d-f fd-c g-4 ai-fs"
    >
      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="free"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-xxl cs-s p-0 m-0 ${
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
                  state.checked ? "w-2 h-2 br-xxl cs-s bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        Free plan
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="pro"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-xxl cs-s p-0 m-0 ${
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
                  state.checked ? "w-2 h-2 br-xxl cs-s bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        Pro plan
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="max"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-xxl cs-s p-0 m-0 ${
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
                  state.checked ? "w-2 h-2 br-xxl cs-s bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        Max plan
      </label>
    </RadioGroup>
  );
}
