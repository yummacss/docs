"use client";

import { Field } from "@base-ui/react/field";

export default function TextareaDisabled() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm" disabled>
      <Field.Label className="fw-500">Cancellation reason</Field.Label>
      <Field.Control
        render={<textarea />}
        placeholder="Please provide your reason..."
        aria-label="Please provide your reason"
        defaultValue="Switching to a different tool."
        className="h-24 w-64 pt-3 pl-3 bc-silver-3 c-slate-6 bw-1 br-md fs-md r-none"
      />
    </Field.Root>
  );
}
