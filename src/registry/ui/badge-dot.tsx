"use client";

export default function BadgeDot() {
  return (
    <div className="d-f fd-c g-6 ai-c">
      <div className="d-f ai-c g-1 px-2 py-1 bg-white bc-red-2 br-sm bw-1 bs-o-xs">
        <span className="w-2 h-2 bg-red-4 br-full" />
        <span className="c-red-4 fs-xs fw-500 us-none">Live</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-red-1 br-sm bw-0">
        <span className="w-2 h-2 bg-red-7 br-full" />
        <span className="c-red-7 fs-xs fw-500 us-none">Live</span>
      </div>
      <div className="d-f ai-c g-1 px-2 py-1 bg-red c-white br-sm bw-0">
        <span className="w-2 h-2 bg-white br-full" />
        <span className="fs-xs fw-500 us-none">Live</span>
      </div>
    </div>
  );
}
