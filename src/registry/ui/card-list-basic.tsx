export default function CardListBasic() {
  return (
    <div className="d-f fd-c g-4 max-w-md">
      <div className="d-f ai-c g-4 p-4 b-1 bc-silver-4 rad-0">
        <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div className="f-1">
          <h4 className="ff-s fs-sm fw-600 tc-slate mb-1">Document.pdf</h4>
          <p className="fs-xs tc-slate-6 m-0">2.4 MB</p>
        </div>
      </div>
      <div className="d-f ai-c g-4 p-4 b-1 bc-silver-4 rad-0">
        <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
        <div className="f-1">
          <h4 className="ff-s fs-sm fw-600 tc-slate mb-1">Image.png</h4>
          <p className="fs-xs tc-slate-6 m-0">1.2 MB</p>
        </div>
      </div>
      <div className="d-f ai-c g-4 p-4 b-1 bc-silver-4 rad-0">
        <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v6h6" />
            <path d="m3 15 2 2 4-4" />
          </svg>
        </div>
        <div className="f-1">
          <h4 className="ff-s fs-sm fw-600 tc-slate mb-1">Report.xlsx</h4>
          <p className="fs-xs tc-slate-6 m-0">856 KB</p>
        </div>
      </div>
    </div>
  );
}
