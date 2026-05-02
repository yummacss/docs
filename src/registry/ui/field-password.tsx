"use client";

import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";

export default function FieldPassword() {
  const [visible, setVisible] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Password <span className="c-red-5">*</span>
      </Field.Label>
      <div className="d-f ai-c p-r">
        <Field.Control
          type={visible ? "text" : "password"}
          placeholder="Enter password"
          aria-label="Enter password"
          className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-6"
        />
        <Button
          className="d-f ai-c jc-c p-a r-3 c-slate-6 c-p us-none"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <EyeSlash className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </Button>
      </div>
      <Field.Description className="c-slate-6 fs-xs">
        Must be at least 8 characters
      </Field.Description>
    </Field.Root>
  );
}
