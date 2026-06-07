"use client";

import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Bold, Italic, Underline } from "iconoir-react";

export default function ButtonGroupPillLabel() {
  return (
    <div className="d-f ai-c g-0 p-1 w-fc bc-silver-2 bg-white bw-1 br-9999 bs-o-xs">
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-slate-10 bw-0 br-9999 fs-sm c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <Bold className="w-4 h-4" />
        Bold
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-silver-3" />
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-slate-10 bw-0 br-9999 fs-sm c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <Italic className="w-4 h-4" />
        Italic
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-silver-3" />
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-slate-10 bw-0 br-9999 fs-sm c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5">
        <Underline className="w-4 h-4" />
        Underline
      </Button>
    </div>
  );
}
