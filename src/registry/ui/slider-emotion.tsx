"use client";

import { Slider } from "@base-ui/react/slider";
import { EmojiPuzzled, EmojiQuite, EmojiSatisfied } from "iconoir-react";
import { useState } from "react";

export default function SliderEmotion() {
  const [value, setValue] = useState(70);

  const emoji =
    value < 30 ? EmojiPuzzled : value < 60 ? EmojiQuite : EmojiSatisfied;

  return (
    <div className="d-f fd-c g-3 w-72 p-4 bg-white bc-silver-2 br-md bw-1 bs-o-xs">
      <div className="d-f ai-c g-3">
        {(() => {
          const Icon = emoji;
          return (
            <span className="d-f ai-c jc-c w-10 h-10 bg-amber-1 c-amber br-9999">
              <Icon className="w-6 h-6" />
            </span>
          );
        })()}
        <div className="d-f fd-c">
          <label className="c-slate-10 fs-sm fw-500 us-none">
            Team Morale
          </label>
          <span className="c-slate-5 fs-xs">
            How are you feeling about this sprint?
          </span>
        </div>
        <span className="ml-auto c-slate-10 fs-sm fw-500">{value}%</span>
      </div>

      <div className="d-f fd-c g-2">
        <Slider.Root value={value} onValueChange={setValue}>
          <Slider.Control className="d-f ai-c us-none ta-none">
            <Slider.Track className="p-r h-2 w-100% bg-silver-2 br-9999">
              <Slider.Indicator className="bg-amber br-9999" />
              <Slider.Thumb className="w-5 h-5 bg-white bc-amber-5 br-9999 bw-1 bs-o-sm fv:oo-2 fv:oc-amber-5" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>

        <div className="d-f jc-sb c-slate-5">
          <span className="d-f ai-c g-1 fs-xs">
            <EmojiPuzzled className="w-3 h-3" />
            Low
          </span>
          <span className="d-f ai-c g-1 fs-xs">
            <EmojiQuite className="w-3 h-3" />
            Okay
          </span>
          <span className="d-f ai-c g-1 fs-xs">
            <EmojiSatisfied className="w-3 h-3" />
            Great
          </span>
        </div>
      </div>
    </div>
  );
}
