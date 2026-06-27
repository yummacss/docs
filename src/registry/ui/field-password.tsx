"use client";

import { Field } from "@base-ui/react/field";
import { Toggle } from "@base-ui/react/toggle";
import { Eye, EyeClosed } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export default function FieldPassword() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Password <span className="c-red-5">*</span>
      </Field.Label>
      <div className="d-f p-r ai-c">
        <Field.Control
          type="password"
          placeholder="Enter password"
          aria-label="Enter password"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
        <div className="d-f p-a r-3 ai-c jc-c c-slate-6">
          <Toggle
            aria-label="Toggle password visibility"
            className="d-f ai-c jc-c p-0 c-slate-6 us-none fv:oo-2 fv:oc-indigo-5"
            render={(props, state) => (
              <motion.button
                type="button"
                {...(props as HTMLMotionProps<"button">)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {state.pressed ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </motion.button>
            )}
          />
        </div>
      </div>
      <Field.Description className="c-slate-6 fs-xs">
        Must be at least 8 characters
      </Field.Description>
    </Field.Root>
  );
}
