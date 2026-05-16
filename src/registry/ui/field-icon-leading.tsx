"use client";

import { Field } from "@base-ui/react/field";
import { Magnifier } from "@gravity-ui/icons";

export default function FieldLeading() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="icon-input" className="c-slate-10 fs-sm fw-500">
        Search products
      </label>
      <div className="d-f p-r ai-c">
        <Magnifier className="p-a l-3 w-4 h-4 c-slate-5" />
        <Field.Control
          id="icon-input"
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          className="h-10 w-64 pl-8 pr-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
      </div>
    </Field.Root>
  );
}
