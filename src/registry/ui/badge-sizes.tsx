"use client";

import { ShieldCheck } from "@gravity-ui/icons";

export default function BadgeSizes() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      {sizes.map((s) => (
        <div key={s.id} className="d-f ai-c g-6">
          <div className={`d-f ai-c g-1 ${s.padding} bg-white bc-silver-2 br-sm bw-1 bs-o-xs`}>
            <span className={`${s.text} c-slate-10 fw-500 us-none`}>{s.base}</span>
          </div>

          <div className={`d-f ai-c g-1 ${s.padding} bg-indigo-1 br-sm`}>
            <ShieldCheck className={`${s.icon} c-indigo-7`} />
            <span className={`${s.text} c-indigo-7 fw-500 us-none`}>{s.iconLabel}</span>
          </div>

          <div className={`d-f ai-c g-1 ${s.padding} bg-indigo c-white br-sm`}>
            <ShieldCheck className={`${s.icon}`} />
            <span className={`${s.text} fw-500 us-none`}>{s.iconSolid}</span>
          </div>

          <div className={`d-f ai-c g-1 ${s.padding} bg-red-1 br-sm`}>
            <span className={`${s.dot} bg-red-7 br-full`} />
            <span className={`${s.text} c-red-7 fw-500 us-none`}>{s.dotLight}</span>
          </div>

          <div className={`d-f ai-c g-1 ${s.padding} bg-red c-white br-sm`}>
            <span className={`${s.dot} bg-white br-full`} />
            <span className={`${s.text} fw-500 us-none`}>{s.dotSolid}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const sizes = [
  {
    id: "xl",
    base: "Label",
    iconLabel: "Label",
    iconSolid: "Label",
    dotLight: "Label",
    dotSolid: "Label",
    padding: "px-3 py-2",
    text: "fs-lg",
    icon: "w-5 h-5",
    dot: "w-3 h-3",
  },
  {
    id: "lg",
    base: "Label",
    iconLabel: "Label",
    iconSolid: "Label",
    dotLight: "Label",
    dotSolid: "Label",
    padding: "px-3 py-1",
    text: "fs-md",
    icon: "w-4 h-4",
    dot: "w-2 h-2",
  },
  {
    id: "md",
    base: "Label",
    iconLabel: "Label",
    iconSolid: "Label",
    dotLight: "Label",
    dotSolid: "Label",
    padding: "px-2 py-1",
    text: "fs-sm",
    icon: "w-4 h-4",
    dot: "w-2 h-2",
  },
  {
    id: "sm",
    base: "Label",
    iconLabel: "Label",
    iconSolid: "Label",
    dotLight: "Label",
    dotSolid: "Label",
    padding: "px-2 py-1",
    text: "fs-xs",
    icon: "w-3 h-3",
    dot: "w-2 h-2",
  },
  {
    id: "xs",
    base: "Label",
    iconLabel: "Label",
    iconSolid: "Label",
    dotLight: "Label",
    dotSolid: "Label",
    padding: "px-2 py-0",
    text: "fs-xs",
    icon: "w-3 h-3",
    dot: "w-1 h-1",
  },
];