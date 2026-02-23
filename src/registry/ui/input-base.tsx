import { Input } from "@base-ui/react/input";

export default function ExampleInput() {
  return (
    <Input
      placeholder="Search projects..."
      aria-label="Search projects"
      className="h-10 w-full max-w-64 pl-4 bg-white bc-silver-3 c-slate-10 br-2 bw-1 fs-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
    />
  );
}
