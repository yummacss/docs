"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { useState } from "react";

export default function ExampleSwitch() {
  const [checked, setChecked] = useState(true);

  return (
    <Field.Root className="d-f ai-c g-2">
      <Switch.Root
        id="switch-controlled"
        checked={checked}
        onCheckedChange={setChecked}
        className="p-r d-f h-6 w-10 br-pill switch-root"
      >
        <Switch.Thumb className="h-full br-pill bg-white switch-thumb" />

        <style>{`
        .switch-root {
          appearance: none;
          border: 0;
          margin: 0;
          outline: 1px solid #dadcdf;
          outline-offset: -1px;
          background-color: transparent;
          background-image: linear-gradient(to right, #0a0a0c 35%, #ecedee 65%);
          background-size: 200% 100%;
          background-position-x: 100%;
          background-repeat: no-repeat;
          transition-property: background-position;
          transition-timing-function: cubic-bezier(0.26, 0.75, 0.38, 0.45);
          transition-duration: 200ms;
          cursor: pointer;
        }
        .switch-root[data-checked] {
          background-position-x: 0%;
        }
        .switch-root:focus-visible {
          outline: 2px solid #26549f;
          outline-offset: 2px;
        }
        .switch-thumb {
          aspect-ratio: 1 / 1;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transition: translate 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .switch-thumb[data-checked] {
          translate: 1rem 0;
        }
      `}</style>
      </Switch.Root>
      <label
        htmlFor="switch-controlled"
        className="fs-sm fw-500 c-slate-12 select-none"
      >
        {checked ? "Notifications ON" : "Notifications OFF"}
      </label>
    </Field.Root>
  );
}
