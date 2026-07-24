import { Meter } from "@base-ui/react/meter";
import { Database } from "iconoir-react";

export default function MeterCard() {
  return (
    <Meter.Root className="d-f fd-c g-3 w-64 p-4 bg-white bc-silver-2 br-lg bw-1" value={68}>
      <div className="d-f ai-c g-3">
        <span className="d-f ai-c jc-c w-8 h-8 bg-indigo-1 c-indigo br-lg">
          <Database className="w-4 h-4" />
        </span>
        <div className="d-f fd-c">
          <Meter.Label className="c-slate-10 fs-sm fw-500">
            Storage used
          </Meter.Label>
          <span className="c-slate-5 fs-xs">3.2 GB of 10 GB</span>
        </div>
      </div>
      <Meter.Track className="o-h h-2 bg-silver-2 br-9999">
        <Meter.Indicator className="d-b h-100% bg-indigo-5 br-9999 tp-w tdu-500 ttf-io" />
      </Meter.Track>
      <Meter.Value className="d-f jc-fe c-slate-5 fs-xs" />
    </Meter.Root>
  );
}
