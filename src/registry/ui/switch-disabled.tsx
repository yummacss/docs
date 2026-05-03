"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { useState } from "react";

export default function SwitchDisabled() {
  const [checked, setChecked] = useState(true);

  return (
    <Field.Root className="d-f ai-c g-2 o-50 c-na">
      <Switch.Root
        id="switch-auto-invite"
        checked={checked}
        onCheckedChange={setChecked}
        disabled
        className="d-f p-r ai-c h-5 w-9 m-0 px-1 bg-silver-3 br-pill bw-0 c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5"
      >
        <Switch.Thumb className="w-3 h-3 ml-4 bg-white br-pill bs-o-sm" />
      </Switch.Root>
      <Field.Label
        htmlFor="switch-auto-invite"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Automatically accept invites
      </Field.Label>
    </Field.Root>
  );
}
