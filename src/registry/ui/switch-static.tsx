"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { useState } from "react";

export default function SwitchStatic() {
  const [checked, setChecked] = useState(true);

  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-dark-mode"
        checked={checked}
        onCheckedChange={setChecked}
        className={`p-r d-f ai-c h-5 w-9 br-9999 m-0 px-1 c-p fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
          checked ? "bg-green-5" : "bg-silver-1"
        }`}
      >
        <Switch.Thumb
          className={`w-4 h-3 bg-white br-9999 bs-o-xs ${
            checked ? "ml-3" : "ml-0"
          }`}
        />
      </Switch.Root>
      <Field.Label
        htmlFor="switch-dark-mode"
        className="c-slate-10 fs-sm fw-500 us-none c-p"
      >
        Unsubscribe email
      </Field.Label>
    </Field.Root>
  );
}
