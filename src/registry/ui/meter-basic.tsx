import { Meter } from "@base-ui/react/meter";

export default function ExampleMeter() {
  return (
    <Meter.Root className="d-g gtc-2 rg-2 w-48" value={24}>
      <Meter.Label className="fs-sm fw-500 c-slate">Storage Used</Meter.Label>
      <Meter.Value className="m-0 fs-sm c-slate ta-r gcs-2" />
      <Meter.Track className="o-h bg-silver-2 h-2 meter-track">
        <Meter.Indicator className="d-b bg-slate-6 h-full meter-indicator" />
      </Meter.Track>

      <style>{`
        .meter-track {
          grid-column: 1 / 3;
          box-shadow: inset 0 0 0 1px var(--silver-4);
        }
        .meter-indicator {
          transition: width 500ms;
        }
      `}</style>
    </Meter.Root>
  );
}
