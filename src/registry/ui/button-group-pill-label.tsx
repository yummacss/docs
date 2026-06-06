"use client";

import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Bold, Italic, Underline } from "iconoir-react";

export default function ButtonGroupPillLabel() {
  return (
    <div className="d-f ai-c g-0 p-1 w-fc bc-slate-4 bg-slate-12 bw-1 br-9999">
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-white bw-0 br-9999 fs-sm c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Bold className="w-4 h-4" />
        Bold
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-white/20" />
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-white bw-0 br-9999 fs-sm c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Italic className="w-4 h-4" />
        Italic
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-white/20" />
      <Button className="d-f ai-c g-2 px-3 py-2 bg-transparent c-white bw-0 br-9999 fs-sm c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Underline className="w-4 h-4" />
        Underline
      </Button>
    </div>
  );
}
