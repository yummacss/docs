"use client";

import { Separator } from "@base-ui/react";
import { Field } from "@base-ui/react/field";

export default function FieldSuffix() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="email-input" className="c-slate-10 fs-sm fw-500">
        Email
      </label>
      <div className="d-f ai-c">
        <Field.Control
          id="email-input"
          type="text"
          placeholder="sarah@yummaui"
          aria-label="Email"
          className="h-10 w-48 pl-4 pr-3 bg-white bc-silver-3 c-slate-10 blr-lg byw-1 blw-1 fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
        <Separator className="w-px h-10 bg-silver-3" />
        <div className="d-f ai-c jc-c px-3 h-10 bg-white bc-silver-3 c-slate-6 brr-lg byw-1 brw-1 fs-md bs-o-xs">
          .com
        </div>
      </div>
    </Field.Root>
  );
}