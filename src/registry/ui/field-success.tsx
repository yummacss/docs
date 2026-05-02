"use client";

import { Field } from "@base-ui/react/field";
import { Check } from "@gravity-ui/icons";

export default function FieldSuccess() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Change username</Field.Label>
      <div className="d-f ai-c p-r">
        <Field.Control
          type="text"
          placeholder="@handle"
          aria-label="Change username"
          defaultValue="@sarah"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-mint-5 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-mint-5"
        />
        <div className="d-f ai-c jc-c p-a r-3 c-mint-5">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-mint-6 fs-xs">
        Username is available
      </Field.Description>
    </Field.Root>
  );
}
