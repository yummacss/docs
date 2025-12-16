export default function HeroSectionBasic() {
    return (
        <div className="py-16 px-6 ta-c">
            <div className="max-w-sm m-auto">
                <h1 className="ff-s fs-5xl fw-600 tc-slate-10 mb-4 lh-1">Build beautiful products faster</h1>
                <p className="fs-lg tc-silver-10 mb-8 m-0 lh-4">
                    The modern platform for teams to design, develop, and ship stunning experiences without the complexity.
                </p>
                <div className="d-f jc-c g-3">
                    <button type="button" className="px-5 py-3 rad-9 fs-md fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">Get started</button>
                    <button type="button" className="ai-c d-f jc-c g-2 px-5 py-3 rad-9 fs-md fw-600 bg-white tc-slate-8 h:bg-silver-1">
                        <span>Learn more</span>
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
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
