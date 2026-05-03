"use client";

import { Switch } from "@base-ui/react/switch";
import { useState } from "react";

export default function SwitchStatic() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="d-f ai-c g-2">
      <Switch.Root
        id="switch-dark-mode-static"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-5 w-9 br-pill bw-0 m-0 px-1 c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
          checked ? "bg-indigo" : "bg-silver-1"
        }`}
      >
        <Switch.Thumb
          className={`w-3 h-3 bg-white br-pill bs-o-xs ${
            checked ? "ml-4" : "ml-0"
          }`}
        />
      </Switch.Root>
      <label
        htmlFor="switch-dark-mode-static"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Dark mode
      </label>
    </div>
  );
}
