"use client";

export default function BadgeCount() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">Assigned</span>
        <span className="d-f ai-c jc-c w-4 h-4 bg-red c-white br-pill fs-xs fw-500">
          3
        </span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo-1 br-sm bw-0">
        <span className="c-indigo-7 fs-xs fw-500 us-none">Assigned</span>
        <span className="d-f ai-c jc-c w-4 h-4 bg-indigo c-white br-pill fs-xs fw-500">
          3
        </span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-indigo c-white br-sm bw-0">
        <span className="fs-xs fw-500 us-none">Assigned</span>
        <span className="d-f ai-c jc-c w-4 h-4 bg-white c-indigo br-pill fs-xs fw-500">
          3
        </span>
      </div>
    </div>
  );
}
