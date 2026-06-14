"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Bell, Heart, Mail, Message } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function RadioIconTrailing() {
  return (
    <RadioGroup defaultValue="all" className="d-f fd-c g-4 ai-fs">
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
        All notifications
        <Bell className="w-4 h-4 c-slate-5 ml-auto" />
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
        Email only
        <Mail className="w-4 h-4 c-slate-5 ml-auto" />
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
        Important only
        <Heart className="w-4 h-4 c-slate-5 ml-auto" />
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
        Mute all
        <Message className="w-4 h-4 c-slate-5 ml-auto" />
      </label>
    </RadioGroup>
  );
}
