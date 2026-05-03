"use client";

import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { useState } from "react";

export default function SwitchDescription() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="d-f fd-c g-1">
      <div className="d-f ai-c g-3">
        <Switch.Root
          id="switch-lyrics"
          checked={checked}
          onCheckedChange={setChecked}
          className={`p-r d-f ai-c h-5 w-9 br-pill bw-0 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
            checked ? "bg-indigo" : "bg-silver-3"
          }`}
        >
          <Switch.Thumb
            render={(props) => (
              <motion.span
                {...props}
                animate={{ x: checked ? 16 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            )}
            className="w-3 h-3 bg-white br-pill bs-o-xs"
          />
        </Switch.Root>
        <span className="c-slate-10 fs-sm fw-500">Show Lyrics</span>
      </div>
      <p className="pl-12 c-slate-6 fs-xs fw-400">
        Display song lyrics while playing.
      </p>
    </div>
  );
}