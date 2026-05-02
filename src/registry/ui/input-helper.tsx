"use client";

import { Field } from "@base-ui/react/field";

export default function InputHelper() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Product ID <span className="c-red-5">*</span></Field.Label>
      <Field.Control
        placeholder="SKU-000000"
        className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6"
      />
      <Field.Description className="c-slate-6 fs-xs">
        Format: SKU followed by 6 digits
      </Field.Description>
    </Field.Root>
  );
}