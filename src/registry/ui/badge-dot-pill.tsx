"use client";

export default function BadgeDotPill() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-9999 bw-1 bs-o-xs">
        <span className="w-2 h-2 bg-green-6 br-100%" />
        <span className="c-slate-10 fs-xs fw-500 us-none">Online</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-green-1 br-9999 bw-0">
        <span className="w-2 h-2 bg-green-7 br-100%" />
        <span className="c-green-7 fs-xs fw-500 us-none">Online</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-green c-white br-9999 bw-0">
        <span className="w-2 h-2 bg-white br-100%" />
        <span className="fs-xs fw-500 us-none">Online</span>
      </div>
    </div>
  );
}
