import { Field } from "@base-ui/react/field";
import { Slider } from "@base-ui/react/slider";

export default function ExampleSlider() {
  return (
    <Field.Root className="d-f fd-c g-1">
      <label
        htmlFor="slider-volume"
        className="c-d fs-sm fw-500 c-slate-12 select-none"
      >
        Volume
      </label>
      <Slider.Root defaultValue={25}>
        <Slider.Control className="d-f ai-c w-56 py-3 us-none slider-control">
          <Slider.Track className="h-1 w-full bg-silver-2 br-pill slider-track">
            <Slider.Indicator className="bg-slate-5 br-pill slider-indicator" />
            <Slider.Thumb
              id="slider-volume"
              className="d-4 bw-1 bc-silver-4 br-full bg-white us-none bsh-sm slider-thumb"
            />
          </Slider.Track>
        </Slider.Control>

        <style>{`
        .slider-control {
          touch-action: none;
        }
        .slider-track {
          box-shadow: inset 0 0 0 1px #dadcdf;
        }
        .slider-thumb {
          outline: 1px solid #dadcdf;
        }
        .slider-thumb:has(:focus-visible) {
          outline: 2px solid #26549f;
        }
      `}</style>
      </Slider.Root>
    </Field.Root>
  );
}
