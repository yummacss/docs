export default function ComparisonListSideBySide() {
  return (
    <div className="d-g gtc-2 g-8">
      <div>
        <h3 className="ff-s fs-md fw-600 tc-slate mb-4">Included</h3>
        <div className="d-f fd-c g-3">
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="fs-sm tc-slate">Unlimited bandwidth</span>
          </div>
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="fs-sm tc-slate">SSL certificate</span>
          </div>
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="fs-sm tc-slate">24/7 monitoring</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="ff-s fs-md fw-600 tc-slate mb-4">Not included</h3>
        <div className="d-f fd-c g-3">
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-red"
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
            <span className="fs-sm tc-slate-6">Custom domain</span>
          </div>
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-red"
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
            <span className="fs-sm tc-slate-6">Priority support</span>
          </div>
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-red"
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
            <span className="fs-sm tc-slate-6">API access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
