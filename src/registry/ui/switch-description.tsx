"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchDescription() {
  const [checked, setChecked] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-1">
      <div className="d-f ai-c g-3">
        <Switch.Root
          id="switch-dark-mode"
          checked={checked}
          onCheckedChange={setChecked}
          className={`p-r d-f ai-c h-5 w-9 br-9999 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:oo-2 fv:oc-indigo-3 ${
            checked ? "bg-indigo" : "bg-silver-1"
          }`}
        >
          <Switch.Thumb
            render={
              <motion.span
                animate={{ x: checked ? 12 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            }
            className="w-4 h-3 bg-white br-9999 bs-o-xs"
          />
        </Switch.Root>
        <Field.Label
          htmlFor="switch-dark-mode"
          className="c-slate-10 fs-sm fw-500"
        >
          Dark mode
        </Field.Label>
      </div>
      <p className="pl-12 c-slate-6 fs-xs fw-400">
        Enable dark mode for better visibility.
      </p>
    </Field.Root>
  );
}
