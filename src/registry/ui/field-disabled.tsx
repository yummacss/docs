"use client";

import { Field } from "@base-ui/react/field";

export default function FieldDisabled() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm" disabled>
      <Field.Label className="fw-500">Project name</Field.Label>
      <Field.Control
        placeholder="Enter project name"
        defaultValue="Private repo"
        className="h-10 w-64 pl-4 c-slate-6 bc-silver-3 bw-1 br-lg fs-md"
      />
    </Field.Root>
  );
}
