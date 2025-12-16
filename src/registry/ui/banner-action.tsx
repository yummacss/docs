export default function BannerAction() {
  return (
    <div className="bg-white b-1 bc-silver-2 px-4 py-3 d-f ai-c jc-sb fs-sm fw-500">
      <div className="d-f ai-c g-3">
        <span className="d-f ai-c jc-c bg-black tc-white rad-9 px-2 py-1 fs-xs fw-700">New</span>
        <span className="tc-slate-9">We just released a new update!</span>
      </div>
      <div className="d-f ai-c g-4">
        <button type="button" className="bg-black tc-white px-3 py-1 rad-0 fs-xs fw-600 h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">Check it out</button>
        <button type="button" className="bg-transparent b-none tc-silver-8 h:tc-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

