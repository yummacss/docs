"use client";

import { Button } from "@base-ui/react/button";

export default function ButtonSizes() {
  return (
    <div className="d-f fd-c g-6 ai-c o-s">
      {sizes.map((s) => (
        <div key={s.id} className="d-f ai-c g-6 fw-w">
          <Button
            className={`d-if ai-c ${s.padding} bg-indigo h:bg-indigo-8 bc-indigo-7 c-white ${s.br} bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${s.text}`}
          >
            {s.label}
          </Button>

          <Button
            className={`d-if ai-c ${s.padding} bg-white h:bg-silver-1 bc-silver-3 c-slate-10 ${s.br} bw-1 fw-500 bs-o-xs tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${s.text}`}
          >
            {s.label}
          </Button>

          <Button
            className={`d-if ai-c ${s.padding} bg-slate-1 h:bg-silver-2 c-slate-10 ${s.br} bw-0 fw-500 tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${s.text}`}
          >
            {s.label}
          </Button>

          <Button
            className={`d-if ai-c ${s.padding} bg-red h:bg-red-8 bc-red-7 c-white ${s.br} bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:ow-2 fv:oo-2 fv:oc-red-5 ${s.text}`}
          >
            {s.label}
          </Button>
        </div>
      ))}
    </div>
  );
}

const sizes = [
  {
    id: "xl",
    label: "Button",
    text: "fs-lg",
    br: "br-lg",
    padding: "px-4 py-3",
  },
  {
    id: "lg",
    label: "Button",
    text: "fs-md",
    br: "br-lg",
    padding: "px-4 py-2",
  },
  {
    id: "md",
    label: "Button",
    text: "fs-sm",
    br: "br-md",
    padding: "px-3 py-2",
  },
  {
    id: "sm",
    label: "Button",
    text: "fs-xs",
    br: "br-md",
    padding: "px-3 py-1",
  },
  {
    id: "xs",
    label: "Button",
    text: "fs-xs",
    br: "br-sm",
    padding: "px-2 py-1",
  },
];
