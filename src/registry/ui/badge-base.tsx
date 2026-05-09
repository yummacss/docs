"use client";

export default function BadgeBase() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-silver-2 br-sm bw-1 bs-o-xs">
        <span className="c-slate-10 fs-xs fw-500 us-none">To Do</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-slate-1 br-sm">
        <span className="c-slate-7 fs-xs fw-500 us-none">In Progress</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-slate c-white br-sm bw-0">
        <span className="fs-xs fw-500 us-none">Done</span>
      </div>
    </div>
  );
}
