"use client";

import { Slider } from "@base-ui/react/slider";

export default function SliderDisabled() {
  return (
    <div className="d-f fd-c g-2 w-64">
      <div className="d-f jc-sb ai-c">
        <label className="c-slate-10 fs-sm fw-500 us-none">Brightness</label>
        <span className="c-slate-8 fs-sm">50%</span>
      </div>
      <Slider.Root value={50} disabled>
        <Slider.Control className="d-f ai-c py-3 o-50 us-none ta-none c-na">
          <Slider.Track className="p-r h-2 w-100% bg-silver-1 br-9999">
            <Slider.Indicator className="bg-indigo-2 br-9999" />
            <Slider.Thumb className="w-5 h-5 bg-white bc-silver-3 br-9999 bw-1 bs-o-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}
