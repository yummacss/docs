"use client";

import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { Bold, Italic, Underline } from "iconoir-react";

export default function ButtonGroupPill() {
  return (
    <div className="d-f ai-c g-0 p-1 bc-border bw-1 br-9999 bg-page w-fc">
      <Button className="d-f ai-c jc-c w-8 h-8 p-0 bg-transparent c-white bw-0 br-9999 c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Bold className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-white/20" />
      <Button className="d-f ai-c jc-c w-8 h-8 p-0 bg-transparent c-white bw-0 br-9999 c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Italic className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-5 w-px bg-white/20" />
      <Button className="d-f ai-c jc-c w-8 h-8 p-0 bg-transparent c-white bw-0 br-9999 c-p h:bg-white/10 fv:oo-2 fv:oc-white/50">
        <Underline className="w-4 h-4" />
      </Button>
    </div>
  );
}
