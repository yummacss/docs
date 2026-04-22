"use client";

export default function BadgeDot() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="d-f ai-c jc-c w-2 h-2 bg-indigo-6 br-pill" />
        <span className="c-slate-10 fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 bc-indigo-2 br-sm bw-1">
        <span className="d-f ai-c jc-c w-2 h-2 bg-indigo-6 br-pill" />
        <span className="c-indigo-7 fs-xs fw-500 us-none">Label</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-sm bw-0">
        <span className="d-f ai-c jc-c w-2 h-2 bg-white br-pill" />
        <span className="fs-xs fw-500 us-none">Label</span>
      </div>
    </div>
  );
}