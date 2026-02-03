import { Separator } from "@base-ui/react/separator";

export default function ExampleSeparator() {
  return (
    <div className="d-f ai-c g-4">
      <span className="fs-sm fw-600 c-slate-10">Dashboard</span>
      <Separator orientation="vertical" className="h-4 w-px bg-silver-3" />
      <span className="fs-sm fw-600 c-slate-10">Settings</span>
      <Separator orientation="vertical" className="h-4 w-px bg-silver-3" />
      <span className="fs-sm fw-600 c-slate-10">Profile</span>
      <Separator orientation="vertical" className="h-4 w-px bg-silver-3" />
      <span className="fs-sm fw-600 c-slate-10">Help</span>
    </div>
  );
}
