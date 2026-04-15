"use client";

import { Switch } from "@base-ui/react/switch";
import * as React from "react";

export default function SwitchStatic() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className="d-f ai-c g-3">
      <Switch.Root
        id="switch-dark-mode-static"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-6 w-11 br-pill bw-0 m-0 px-1 c-p fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
          checked ? "bg-indigo" : "bg-silver-3"
        }`}
      >
        <Switch.Thumb
          className={`w-4 h-4 bg-white br-pill bs-o-sm ${
            checked ? "ml-5" : "ml-0"
          }`}
        />
      </Switch.Root>
      <label
        htmlFor="switch-dark-mode-static"
        className="c-slate-10 fs-sm fw-600 us-none c-p"
      >
        Dark mode
      </label>
    </div>
  );
}
