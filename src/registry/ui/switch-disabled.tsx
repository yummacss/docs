"use client";

import { Switch } from "@base-ui/react/switch";
import { useState } from "react";

export default function SwitchDisabled() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="d-f ai-c g-3 c-na o-50">
      <Switch.Root
        id="switch-auto-invite"
        checked={checked}
        onCheckedChange={setChecked}
        disabled
        className="p-r d-f ai-c h-5 w-9 br-pill bw-0 m-0 px-1 c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5 bg-silver-3"
      >
        <Switch.Thumb className="w-3 h-3 bg-white br-pill bs-o-xs ml-4" />
      </Switch.Root>
      <label
        htmlFor="switch-auto-invite"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Automatically accept invites
      </label>
    </div>
  );
}