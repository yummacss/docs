import { Separator } from "@base-ui/react/separator";

export default function ExampleSeparator() {
  return (
    <div className="d-f ai-c g-4">
      <span className="fs-sm c-slate-8">© 2025 Acme Inc</span>
      <Separator orientation="vertical" className="h-4 w-px bg-silver-3" />
      <span className="fs-sm fw-600 c-slate-10">Privacy Policy</span>
    </div>
  );
}
