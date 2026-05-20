"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchAccentIconColor() {
  const [checked, setChecked] = useState(false);

  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-notifications-icon-color"
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
              className="w-4 h-3 bg-white br-9999 bs-o-xs"
            />
          }
        />
        {checked && <Check className="d-f p-a l-1 ai-c jc-c w-3 h-3 c-white" />}
      </Switch.Root>
      <Field.Label
        htmlFor="switch-notifications-icon-color"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Push notifications
      </Field.Label>
    </Field.Root>
  );
}
