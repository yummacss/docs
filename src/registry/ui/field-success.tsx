"use client";

import { Field } from "@base-ui/react/field";
import { Check } from "iconoir-react";

export default function FieldSuccess() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Workspace name</Field.Label>
      <div className="d-f p-r ai-c">
        <Field.Control
          type="text"
          placeholder="Your workspace"
          aria-label="Workspace name"
          defaultValue="John"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-green-5 c-slate-10 bw-1 br-md fs-md bs-o-xs fv:oo--1 fv:oc-green-5"
        />
        <div className="d-f p-a r-3 ai-c jc-c c-green-5">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-green-6 fs-xs">
        Workspace name is available
      </Field.Description>
    </Field.Root>
  );
}
