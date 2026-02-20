"use client";

import { Slider } from "@base-ui/react/slider";
import * as React from "react";

export default function ExampleSlider() {
  const [value, setValue] = React.useState(50);

  return (
    <div className="d-f fd-c g-2 w-64">
      <div className="d-f jc-sb ai-c">
        <label className="fs-sm fw-600 c-slate-10 us-none">Brightness</label>
        <span className="fs-sm c-slate-8">{value}%</span>
      </div>
      <Slider.Root value={value} onValueChange={setValue}>
        <Slider.Control className="d-f ai-c py-3 us-none ta-none">
          <Slider.Track className="p-r h-2 w-full bg-silver-2 br-pill bw-1 bc-silver-3">
            <Slider.Indicator className="bg-indigo br-pill" />
            <Slider.Thumb className="w-5 h-5 br-pill bg-white bw-1 bc-silver-3 us-none bs-o-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}
