import { Input } from "@base-ui/react/input";

export default function ExampleInput() {
  return (
    <Input
      placeholder="Search projects..."
      aria-label="Search projects"
      className="h-10 w-full max-w-64 br-2 bw-1 bc-silver-3 pl-4 fs-sm c-slate-10 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
    />
  );
}
