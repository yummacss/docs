export default function CtaSectionIcons() {
    return (
        <div className="py-6 px-6 d-f ai-c jc-sb fw-w g-4">
            <h2 className="ff-s fs-3xl fw-600 tc-slate-10 m-0">Ready to get started?</h2>
            <div className="d-f g-3">
                <button type="button" className="d-f ai-c g-2 px-4 py-2 rad-0 fs-sm fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">
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
                    <span>Get started</span>
                </button>
                <button type="button" className="d-f ai-c g-2 px-4 py-2 rad-0 fs-sm fw-600 bg-white tc-slate-8 b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2">
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    <span>Download</span>
                </button>
            </div>
        </div>
    );
}
