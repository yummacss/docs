import { Separator } from "@base-ui/react/separator";

export default function SeparatorBackground() {
  return (
    <div className="d-f o-h fd-c g-0 w-full bc-silver-2 br-lg bw-1">
      <div className="d-f fd-c g-1 px-4 py-3 bg-silver-1/50">
        <span className="c-slate-10 fs-sm fw-500">Now Playing</span>
        <span className="c-slate-8 fs-xs">Midnight Dreams - Luna Wave</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 px-4 py-3">
        <span className="c-slate-10 fs-sm fw-500">Up Next</span>
        <span className="c-slate-8 fs-xs">Velvet Sky - The Stars</span>
      </div>
      <Separator className="h-px w-full bg-silver-2" />
      <div className="d-f fd-c g-1 px-4 py-3 bg-silver-1/30">
        <span className="c-slate-10 fs-sm fw-500">Recently Played</span>
        <span className="c-slate-8 fs-xs">Ocean Breeze - Coastal</span>
      </div>
    </div>
  );
}
