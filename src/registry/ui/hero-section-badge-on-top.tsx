export default function HeroSectionBadgeOnTop() {
    return (
        <div className="py-16 px-6 ta-c">
            <div className="max-w-sm m-auto">
                <div className="d-f jc-c mb-4">
                    <span className="d-f ai-c g-2 bg-indigo-1 tc-indigo-8 px-3 py-1 rad-9 fs-xs fw-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                        <span>New features available</span>
                    </span>
                </div>
                <h1 className="ff-s fs-5xl fw-600 tc-slate-10 mb-4 lh-1">The future of work starts here</h1>
                <p className="fs-lg tc-silver-10 mb-8 m-0 lh-4">Empower your team with tools that simplify collaboration and boost productivity across every project.</p>
                <div className="d-f jc-c g-3">
                    <button type="button" className="px-5 py-3 rad-9 fs-md fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">Start free trial</button>
                    <button type="button" className="px-5 py-3 rad-9 fs-md fw-600 bg-white tc-slate-8 h:bg-silver-1">View demo</button>
                </div>
            </div>
        </div>
    );
}
