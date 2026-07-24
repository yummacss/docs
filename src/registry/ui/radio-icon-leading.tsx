"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Bell, Heart, Mail, Message } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function RadioIconLeading() {
  return (
    <RadioGroup defaultValue="all" className="d-f fd-c g-3 ai-fs">
      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="all"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:oo-2 fv:oc-indigo-5`
          }
          render={(props, _) => (
            <motion.span
              {...(props as HTMLMotionProps<"span">)}

            >
              <Radio.Indicator
                className={(state) =>
                  state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        <Bell className="w-4 h-4 c-slate-5" />
        All notifications
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="email"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:oo-2 fv:oc-indigo-5`
          }
          render={(props, _) => (
            <motion.span
              {...(props as HTMLMotionProps<"span">)}

            >
              <Radio.Indicator
                className={(state) =>
                  state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        <Mail className="w-4 h-4 c-slate-5" />
        Email only
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="important"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:oo-2 fv:oc-indigo-5`
          }
          render={(props, _) => (
            <motion.span
              {...(props as HTMLMotionProps<"span">)}

            >
              <Radio.Indicator
                className={(state) =>
                  state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        <Heart className="w-4 h-4 c-slate-5" />
        Important only
      </label>

      <label className="d-f ai-c g-2 c-slate-10 fs-sm fw-500 c-p">
        <Radio.Root
          value="none"
          className={(state) =>
            `d-f ai-c jc-c w-4 h-4 br-9999 p-0 m-0 ${
              state.checked ? "bg-indigo" : "bg-white bw-1 bc-silver-3"
            } fv:oo-2 fv:oc-indigo-5`
          }
          render={(props, _) => (
            <motion.span
              {...(props as HTMLMotionProps<"span">)}

            >
              <Radio.Indicator
                className={(state) =>
                  state.checked ? "w-2 h-2 br-9999 bg-white" : "d-none"
                }
              />
            </motion.span>
          )}
        />
        <Message className="w-4 h-4 c-slate-5" />
        Mute all
      </label>
    </RadioGroup>
  );
}
