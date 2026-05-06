"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchBase() {
  const [checked, setChecked] = useState(false);

  return (
    <Field.Root className="d-f ai-c g-2 o-50">
      <Switch.Root
        disabled
        id="switch-auto-invite"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-5 w-9 br-pill c-na m-0 px-1 c-na tp-c tdu-150 ttf-io fv:ow-2 fv:oo-2 fv:oc-mint-5 ${
          checked ? "bg-mint-5" : "bg-red-1"
        }`}
      >
        <Switch.Thumb
          render={
            <motion.span
              animate={{ x: checked ? 12 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          }
          className="w-4 h-3 bg-white br-pill bs-o-xs"
        />
      </Switch.Root>
      <Field.Label
        htmlFor="switch-auto-invite"
        className="c-slate-10 fs-sm fw-500 us-none c-na"
      >
        Automatically accept invites
      </Field.Label>
    </Field.Root>
  );
}
