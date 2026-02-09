"use client";

import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import * as React from "react";

export default function ExampleSwitch() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className="d-f ai-c g-3">
      <Switch.Root
        id="switch-dark-mode"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-6 w-11 br-pill bw-0 m-0 p-px c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
          checked ? "bg-indigo" : "bg-silver-3"
        }`}
      >
        <Switch.Thumb
          render={
            <motion.span
              animate={{ x: checked ? 22 : 0 }}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
            />
          }
          className="d-5 br-pill bg-white bsh-sm"
        />
      </Switch.Root>
      <label
        htmlFor="switch-dark-mode"
        className="fs-sm fw-600 c-slate-10 us-none c-p"
      >
        Dark mode
      </label>
    </div>
  );
}
