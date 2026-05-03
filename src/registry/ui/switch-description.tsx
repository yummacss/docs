"use client";

import { Switch } from "@base-ui/react/switch";

export default function SwitchDescription() {
  return (
    <div className="d-f fd-c g-1">
      <div className="d-f ai-c g-3">
        <Switch.Root
          id="switch-notifications"
          defaultChecked
          className={`p-r d-f ai-c h-5 w-9 br-pill bw-0 m-0 px-1 c-p tp-c tdu-150 ttf-io fv:ow-2 fv:oo-2 fv:oc-indigo-5 ${
            "bg-indigo"
          }`}
        >
          <Switch.Thumb className="w-3 h-3 bg-white br-pill bs-o-sm ml-4" />
        </Switch.Root>
        <span className="c-slate-10 fs-sm fw-500">Notifications</span>
      </div>
      <p className="pl-12 c-slate-6 fs-xs fw-400">
        Receive email and push notifications.
      </p>
    </div>
  );
}