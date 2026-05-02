"use client";

import { Field } from "@base-ui/react/field";
import { Check } from "@gravity-ui/icons";

export default function InputSuccess() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Change username</Field.Label>
      <div className="d-f ai-c w-64 bg-white bc-mint-5 bw-1 br-lg bs-o-xs fv:ow-2 fv:oo-2 fv:oc-mint-5">
        <input
          type="text"
          placeholder="@handle"
          aria-label="Change username"
          defaultValue="@sarah_connor"
          className="f-1 h-10 pl-4 pr-2 bg-transparent c-slate-10 fs-md us-none"
        />
        <div className="d-f ai-c jc-c pr-3 c-mint-5">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-mint-6 fs-xs">
        Username is available
      </Field.Description>
    </Field.Root>
  );
}
