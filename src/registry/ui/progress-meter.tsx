"use client";

import { Meter } from "@base-ui/react/meter";

export default function ProgressMeter() {
  return (
    <Meter.Root className="d-f fd-c g-2 w-64" value={68}>
      <div className="d-f jc-sb ai-c">
        <Meter.Label className="c-slate-10 fs-sm fw-500">
          Storage used
        </Meter.Label>
        <Meter.Value className="c-slate-8 fs-sm" />
      </div>
      <Meter.Track className="o-h h-2 bg-silver-2 br-pill">
        <Meter.Indicator className="d-b h-full bg-indigo br-pill tp-w tdu-500 ttf-io" />
      </Meter.Track>
    </Meter.Root>
  );
}
