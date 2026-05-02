"use client";

import { Slider } from "@base-ui/react/slider";
import { useState } from "react";

export default function SliderVertical() {
  const [value, setValue] = useState(50);

  return (
    <div className="d-f fd-c g-2 h-64 ai-c">
      <label className="c-slate-10 fs-sm fw-500 us-none">Volume</label>
      <Slider.Root orientation="vertical" value={value} onValueChange={setValue} className="h-full">
        <Slider.Control className="d-f fd-c jc-c w-10 h-full us-none ta-none">
          <Slider.Track className="p-r w-2 h-full bg-silver-2 br-pill">
            <Slider.Indicator className="bg-indigo br-pill" />
            <Slider.Thumb className="w-5 h-5 bg-white bc-silver-3 br-pill bw-1 bs-o-sm fv:ow-2 fv:oo-2 fv:oc-indigo-5" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
      <span className="c-slate-8 fs-sm">{value}%</span>
    </div>
  );
}