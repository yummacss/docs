import { Separator } from "@base-ui/react/separator";

export default function SeparatorLabel() {
  return (
    <div className="d-f ai-c g-2 w-full">
      <Separator className="h-px fg-1 bg-silver-2" />
      <span className="fs-xs c-slate-6 fw-500 tt-u ls-3">or</span>
      <Separator className="h-px fg-1 bg-silver-2" />
    </div>
  );
}
