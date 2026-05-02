"use client";

import { Field } from "@base-ui/react/field";

export default function InputSizes() {
  return (
    <div className="d-f fd-c g-4">
      <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
        <Field.Label className="fw-500">Small</Field.Label>
        <Field.Control
          placeholder="Small input"
          className="h-8 w-64 pl-3 pr-3 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-sm bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
      </Field.Root>

      <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
        <Field.Label className="fw-500">Medium</Field.Label>
        <Field.Control
          placeholder="Medium input"
          className="h-10 w-64 pl-4 pr-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
      </Field.Root>

      <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
        <Field.Label className="fw-500">Large</Field.Label>
        <Field.Control
          placeholder="Large input"
          className="h-12 w-64 pl-5 pr-5 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-lg bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
      </Field.Root>
    </div>
  );
}
