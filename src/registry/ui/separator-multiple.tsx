import { Separator } from "@base-ui/react/separator";

export default function SeparatorMultiple() {
  return (
    <div className="d-f fd-c g-0 w-full p-4 bg-white bc-silver-2 br-lg bw-1">
      <div className="d-f fd-c g-1 mb-2">
        <span className="c-slate-10 fs-sm fw-500">Account Settings</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 py-3">
        <span className="c-slate-10 fs-sm">Email Preferences</span>
        <span className="c-slate-6 fs-xs">Manage your email notifications</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 py-3">
        <span className="c-slate-10 fs-sm">Privacy</span>
        <span className="c-slate-6 fs-xs">Control who sees your profile</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 py-3">
        <span className="c-slate-10 fs-sm">Security</span>
        <span className="c-slate-6 fs-xs">Password and two-factor auth</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 pt-2">
        <span className="c-slate-10 fs-sm">Billing</span>
        <span className="c-slate-6 fs-xs">
          Plan details and payment methods
        </span>
      </div>
    </div>
  );
}
