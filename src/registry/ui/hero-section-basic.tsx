export default function HeroSectionBasic() {
  return (
    <div className="py-16 px-6 ta-c">
      <div className="max-w-sm m-auto">
        <h1 className="ff-s fs-5xl fw-600 tc-slate-10 mb-4 lh-1">
          Build beautiful products faster
        </h1>
        <p className="fs-lg tc-silver-10 mb-8 m-0 lh-4">
          The modern platform for teams to design, develop, and ship stunning
          experiences without the complexity.
        </p>
        <div className="d-f jc-c g-3">
          <button
            type="button"
            className="px-5 py-3 rad-9 fs-md fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Get started
          </button>
          <button
            type="button"
            className="ai-c d-f jc-c g-2 px-5 py-3 rad-9 fs-md fw-600 bg-white tc-slate-8 h:bg-silver-1"
          >
            <span>Learn more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </div>
  );
}
