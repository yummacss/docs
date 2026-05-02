"use client";

import { Slider } from "@base-ui/react/slider";
import { useState } from "react";

export default function SliderRange() {
  const [value, setValue] = useState([20, 80]);

  return (
    <div className="d-f fd-c g-2 w-64">
      <div className="d-f jc-sb ai-c">
        <label className="c-slate-10 fs-sm fw-500 us-none">Price Range</label>
        <span className="c-slate-8 fs-sm">${value[0]} - ${value[1]}</span>
      </div>
      <Slider.Root value={value} onValueChange={setValue}>
        <Slider.Control className="d-f ai-c py-3 us-none ta-none">
          <Slider.Track className="p-r h-2 w-full bg-silver-2 br-pill">
            <Slider.Indicator className="bg-indigo br-pill" />
            <Slider.Thumb className="w-5 h-5 bg-white bc-silver-3 br-pill bw-1 bs-o-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
            <Slider.Thumb className="w-5 h-5 bg-white bc-silver-3 br-pill bw-1 bs-o-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}