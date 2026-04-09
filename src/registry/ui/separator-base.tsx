import { Separator } from "@base-ui/react/separator";

export default function SeparatorBase() {
  return (
    <div className="d-f ai-c g-4">
      <span className="c-slate-8 fs-sm">© 2025 Acme Inc</span>
      <Separator orientation="vertical" className="h-4 w-px bg-silver-3" />
      <span className="c-slate-10 fs-sm fw-600">Privacy Policy</span>
    </div>
  );
}
