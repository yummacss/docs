import { Slider } from "@base-ui/react/slider";

export default function ExampleSlider() {
  return (
    <Slider.Root defaultValue={25}>
      <Slider.Control className="d-f ai-c w-56 py-3 us-none slider-control">
        <Slider.Track className="h-1 w-full bg-silver-2 slider-track">
          <Slider.Indicator className="bg-slate-6 slider-indicator" />
          <Slider.Thumb className="d-4 br-full bg-white bw-1 bc-silver-4 us-none slider-thumb" />
        </Slider.Track>
      </Slider.Control>

      <style>{`
        .slider-control {
          touch-action: none;
        }
        .slider-track {
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px var(--silver-4);
        }
        .slider-indicator {
          border-radius: 0.25rem;
        }
        .slider-thumb {
          outline: 1px solid var(--silver-4);
        }
        .slider-thumb:has(:focus-visible) {
          outline: 2px solid var(--blue-8);
        }
      `}</style>
    </Slider.Root>
  );
}
