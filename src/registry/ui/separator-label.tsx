import { Separator } from "@base-ui/react/separator";

export default function SeparatorLabel() {
  return (
    <div className="d-f ai-c g-2 w-100%">
      <Separator className="fg-1 h-px bg-silver-2" />
      <span className="c-slate-6 fs-xs fw-500 tt-u ls-3">or</span>
      <Separator className="fg-1 h-px bg-silver-2" />
    </div>
  );
}
