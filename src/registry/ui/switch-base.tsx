"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchBase() {
  const [checked, setChecked] = useState(true);

  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-unsubscribe"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-5 w-9 br-9999 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:ow-2 fv:oo-2 fv:oc-green-5 ${
          checked ? "bg-green-5" : "bg-silver-1"
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
        htmlFor="switch-unsubscribe"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Unsubscribe email
      </Field.Label>
    </Field.Root>
  );
}
