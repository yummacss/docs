import { Meter } from "@base-ui/react/meter";

export default function MeterOutset() {
  return (
    <Meter.Root className="d-f fd-c g-2 w-64 p-4 bg-white bc-silver-2 br-lg bw-1 bs-o-xs" value={68}>
      <div className="d-f jc-sb ai-c">
        <Meter.Label className="c-slate-10 fs-sm fw-500">
          Storage used
        </Meter.Label>
        <Meter.Value className="c-slate-8 fs-sm" />
      </div>
      <Meter.Track className="o-h h-2 bg-silver-2 br-9999">
        <Meter.Indicator className="d-b h-100% bg-yellow br-9999 tp-w tdu-500 ttf-io" />
      </Meter.Track>
    </Meter.Root>
  );
}
