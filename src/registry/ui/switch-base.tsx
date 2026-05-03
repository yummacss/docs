"use client";

import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchBase() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="d-f ai-c g-2">
      <Switch.Root
        id="switch-dark-mode"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-5 w-9 br-pill bw-0 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
          checked ? "bg-indigo" : "bg-silver-3"
        }`}
      >
        <Switch.Thumb
          render={
            <motion.span
              animate={{ x: checked ? 16 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          }
          className="w-3 h-3 bg-white br-pill bs-o-sm"
        />
      </Switch.Root>
      <label
        htmlFor="switch-dark-mode"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Dark mode
      </label>
    </div>
  );
}