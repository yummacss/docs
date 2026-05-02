"use client";

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { Magnifier } from "@gravity-ui/icons";

export default function FieldIconRight() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="icon-right-input" className="c-slate-10 fs-sm fw-500">
        Search in store
      </label>
      <div className="d-f p-r ai-c">
        <Field.Control
          id="icon-right-input"
          type="text"
          placeholder="Search in store..."
          aria-label="Search in store"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-6"
        />
        <Button
          className="d-f p-a r-3 ai-c jc-c c-slate-6 c-p us-none"
          aria-label="Search"
        >
          <Magnifier className="w-4 h-4" />
        </Button>
      </div>
    </Field.Root>
  );
}
