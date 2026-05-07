"use client";

import { Separator } from "@base-ui/react";
import { Field } from "@base-ui/react/field";

export default function FieldPrefix() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="website-input" className="c-slate-10 fs-sm fw-500">
        Website
      </label>
      <div className="d-f ai-c">
        <div className="d-f ai-c jc-c px-3 h-10 bg-white bc-silver-3 c-slate-6 blr-lg byw-1 blw-1 fs-md bs-o-xs">
          https://
        </div>
        <Separator className="w-px h-10 bg-silver-3" />
        <Field.Control
          id="website-input"
          type="text"
          placeholder="ui.yummacss.com"
          aria-label="Website"
          className="h-10 w-56 pl-3 pr-4 bg-white bc-silver-3 c-slate-10 brr-lg byw-1 brw-1 fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
      </div>
    </Field.Root>
  );
}
