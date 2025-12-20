export default function HeroSectionBadgeOnTop() {
  return (
    <div className="py-16 px-6 ta-c">
      <div className="max-w-sm m-auto">
        <div className="d-f jc-c mb-4">
          <span className="d-f ai-c g-2 bg-indigo-1 tc-indigo-8 px-3 py-1 rad-9 fs-xs fw-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <rect width="256" height="256" fill="none" />
              <line
                x1="208"
                y1="120"
                x2="208"
                y2="72"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="232"
                y1="96"
                x2="184"
                y2="96"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="160"
                y1="32"
                x2="160"
                y2="64"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="176"
                y1="48"
                x2="144"
                y2="48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M210.69,158.18A96.78,96.78,0,0,1,192,160,96.08,96.08,0,0,1,97.82,45.31,88,88,0,1,0,210.69,158.18Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span>New features available</span>
          </span>
        </div>
        <h1 className="ff-s fs-5xl fw-600 tc-slate-10 mb-4 lh-1">
          The future of work starts here
        </h1>
        <p className="fs-lg tc-silver-10 mb-8 m-0 lh-4">
          Empower your team with tools that simplify collaboration and boost
          productivity across every project.
        </p>
        <div className="d-f jc-c g-3">
          <button
            type="button"
            className="px-5 py-3 rad-9 fs-md fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Start free trial
          </button>
          <button
            type="button"
            className="px-5 py-3 rad-9 fs-md fw-600 bg-white tc-slate-8 h:bg-silver-1"
          >
            View demo
          </button>
        </div>
      </div>
    </div>
  );
}
