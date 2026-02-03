import { Separator } from "@base-ui/react/separator";
import { BellIcon, GearIcon, ShieldCheckIcon } from "@phosphor-icons/react";

export default function ExampleSeparator() {
  return (
    <div className="d-f fd-c w-72 bw-1 bc-silver-2 br-2 bg-white bsh-lg">
      <div className="d-f ai-c g-3 p-4">
        <span className="d-f ai-c jc-c d-8 br-2 bg-silver-1 c-indigo">
          <GearIcon size={18} weight="bold" />
        </span>
        <div>
          <h3 className="fs-sm fw-600 c-slate-10 m-0">Account Settings</h3>
          <p className="fs-xs c-slate-8 m-0">Manage your preferences</p>
        </div>
      </div>

      <Separator className="h-px bg-silver-2" />

      <div className="d-f fd-c g-3 p-4">
        <div className="d-f ai-c jc-sb">
          <div className="d-f ai-c g-3">
            <span className="d-f ai-c jc-c d-8 br-2 bg-silver-1 c-indigo">
              <BellIcon size={18} weight="bold" />
            </span>
            <span className="fs-sm c-slate-10">Email notifications</span>
          </div>
          <span className="fs-xs c-emerald fw-600">Enabled</span>
        </div>
        <div className="d-f ai-c jc-sb">
          <div className="d-f ai-c g-3">
            <span className="d-f ai-c jc-c d-8 br-2 bg-silver-1 c-indigo">
              <ShieldCheckIcon size={18} weight="bold" />
            </span>
            <span className="fs-sm c-slate-10">Two-factor auth</span>
          </div>
          <span className="fs-xs c-red fw-600">Disabled</span>
        </div>
      </div>

      <Separator className="h-px bg-silver-2" />

      <div className="p-4">
        <span className="fs-xs c-slate-8">Last updated 2 days ago</span>
      </div>
    </div>
  );
}
