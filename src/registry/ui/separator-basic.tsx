/** biome-ignore-all lint/a11y/useValidAnchor: This is just a demo */
import { Separator } from "@base-ui/react/separator";

export default function ExampleSeparator() {
  return (
    <div className="d-f g-4 ws-nw">
      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Home
      </a>
      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Pricing
      </a>
      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Blog
      </a>
      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Support
      </a>

      <Separator orientation="vertical" className="w-px bg-silver-4" />

      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Log in
      </a>
      <a href="#" className="fs-sm c-slate-12 td-n h:td-u fv:td-u">
        Sign up
      </a>
    </div>
  );
}
