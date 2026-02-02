"use client";

import { Meter } from "@base-ui/react/meter";

export default function ExampleMeter() {
  return (
    <Meter.Root className="d-f fd-c g-2 w-64" value={68}>
      <div className="d-f jc-sb ai-c">
        <Meter.Label className="fs-sm fw-600 c-slate-10">
          Memory usage
        </Meter.Label>
        <Meter.Value className="fs-sm c-slate-8" />
      </div>
      <Meter.Track className="o-h bg-silver-2 h-2 br-pill">
        <Meter.Indicator className="d-b bg-indigo h-full br-pill tp-w tdu-500 ttf-io" />
      </Meter.Track>
    </Meter.Root>
  );
}
