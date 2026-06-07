"use client";

import { Button } from "@base-ui/react/button";
import { Mail, Plus } from "iconoir-react";

export default function EmptyStateInbox() {
  return (
    <div className="d-f fd-c ai-c jc-c g-4 p-8">
      <div className="d-f ai-c jc-c w-10 h-10 bc-silver-3 c-slate-5 br-md bw-1 bs-o-xs">
        <Mail className="w-5 h-5" />
      </div>
      <div className="d-f fd-c ai-c g-1 ta-c">
        <span className="c-slate-10 fs-md fw-500">No messages yet</span>
        <span className="c-slate-6 fs-sm">
          Start a conversation with your team.
        </span>
      </div>
      <Button className="d-if ai-c g-2 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-500 bs-o-md tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5">
        <Plus className="w-4 h-4" />
        New message
      </Button>
    </div>
  );
}
