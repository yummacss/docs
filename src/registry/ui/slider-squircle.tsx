"use client";

import { Slider } from "@base-ui/react/slider";
import { useState } from "react";

export default function SliderSquircle() {
  const [value, setValue] = useState(50);

  return (
    <div className="d-f fd-c g-2 w-64">
      <div className="d-f jc-sb ai-c">
        <label className="c-slate-10 fs-sm fw-500 us-none">Brightness</label>
        <span className="c-slate-8 fs-sm">{value}%</span>
      </div>
      <Slider.Root value={value} onValueChange={setValue}>
        <Slider.Control className="d-f ai-c py-3 us-none ta-none">
          <Slider.Track className="p-r h-2 w-100% bg-silver-1 br-xxl cs-s">
            <Slider.Indicator className="bg-indigo br-xxl cs-s" />
            <Slider.Thumb className="w-5 h-5 bg-white bc-silver-3 br-xxl cs-s bw-1 bs-o-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}
