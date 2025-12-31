export default function CtaSectionIcons() {
  return (
    <div className="py-6 px-6 d-f ai-c jc-sb fw-w g-4">
      <h2 className="ff-s fs-3xl fw-600 c-slate-10 m-0">
        Ready to get started?
      </h2>
      <div className="d-f g-3">
        <button
          type="button"
          className="d-f ai-c g-2 px-4 py-2 br-0 fs-sm fw-600 bg-slate-8 c-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <polyline
              points="144 56 216 128 144 200"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <span>Get started</span>
        </button>
        <button
          type="button"
          className="d-f ai-c g-2 px-4 py-2 br-0 fs-sm fw-600 bg-white c-slate-8 bw-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <rect width="256" height="256" fill="none" />
            <line
              x1="128"
              y1="144"
              x2="128"
              y2="32"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <polyline
              points="216 144 216 208 40 208 40 144"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <polyline
              points="168 104 128 144 88 104"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
