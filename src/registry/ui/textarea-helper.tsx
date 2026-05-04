"use client";

import { Field } from "@base-ui/react/field";

export default function TextareaHelper() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Comments</Field.Label>
      <Field.Control
        render={<textarea />}
        placeholder="Write your comment..."
        aria-label="Write your comment"
        className="h-24 w-64 pt-3 pl-3 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs r-none fv:oo--1 fv:oc-indigo-5"
      />
      <Field.Description className="c-slate-6 fs-xs">
        Be respectful and constructive
      </Field.Description>
    </Field.Root>
  );
}
