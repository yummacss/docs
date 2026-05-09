"use client";

import { Field } from "@base-ui/react/field";
import { useState } from "react";

export default function TextareaCounter() {
  const [value, setValue] = useState("");
  const maxLength = 100;

  return (
    <Field.Root className="d-f fd-c g-2">
      <label htmlFor="bio-input" className="c-slate-10 fs-sm fw-500">
        Bio
      </label>
      <Field.Control
        render={<textarea />}
        id="bio-input"
        placeholder="Tell us about yourself..."
        maxLength={maxLength}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-20 w-64 p-3 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs r-none us-none resize-none fv:oo--1 fv:oc-indigo-5"
      />
      <span className="c-slate-6 fs-xs">
        {value.length} / {maxLength}
      </span>
    </Field.Root>
  );
}
