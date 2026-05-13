"use client";

export default function BadgePill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-9999 bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">High Priority</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 br-9999 bw-0">
        <span className="c-indigo-7 fs-xs fw-500 us-none">High Priority</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-9999 bw-0">
        <span className="fs-xs fw-500 us-none">High Priority</span>
      </div>
    </div>
  );
}
