"use client";

import { Field } from "@base-ui/react/field";

export default function FieldLabel() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Project name</Field.Label>
      <Field.Control
        placeholder="Enter project name"
        className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
      />
    </Field.Root>
  );
}
