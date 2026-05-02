"use client";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Field } from "@base-ui/react/field";
import { useState } from "react";

export default function InputPassword() {
  const [visible, setVisible] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Password <span className="c-red-5">*</span></Field.Label>
      <div className="d-f ai-c w-64 bg-white bc-silver-3 bw-1 br-lg bs-o-xs fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <input
          type={visible ? "text" : "password"}
          placeholder="Enter password"
          aria-label="Enter password"
          className="h-10 f-1 pl-4 pr-2 bg-transparent c-slate-10 fs-md us-none"
        />
        <button
          type="button"
          className="d-f ai-c jc-c pr-3 c-slate-6 c-p us-none"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <EyeSlash className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      <Field.Description className="c-slate-6 fs-xs">
        Must be at least 8 characters
      </Field.Description>
    </Field.Root>
  );
}