"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchLg() {
  const [checked, setChecked] = useState(true);

  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-unsubscribe-lg"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-6 w-11 br-9999 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:oo-2 fv:oc-indigo-3 ${
          checked ? "bg-indigo" : "bg-silver-1"
        }`}
      >
        <Switch.Thumb
          render={
            <motion.span
              animate={{ x: checked ? 16 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          }
          className="w-5 h-4 bg-white br-9999 bs-o-xs"
        />
      </Switch.Root>
      <Field.Label
        htmlFor="switch-unsubscribe-lg"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Unsubscribe email
      </Field.Label>
    </Field.Root>
  );
}
