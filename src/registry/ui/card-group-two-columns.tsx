export default function CardGroupTwoColumns() {
  return (
    <div className="p-6">
      <div className="d-g gtc-1 sm:gtc-2 g-6">
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate mb-2">Analytics</h3>
          <p className="fs-sm tc-slate-6 m-0">
            Track your metrics and monitor performance in real-time.
          </p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate mb-2">Automation</h3>
          <p className="fs-sm tc-slate-6 m-0">
            Automate workflows and save time on repetitive tasks.
          </p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate mb-2">Integrations</h3>
          <p className="fs-sm tc-slate-6 m-0">
            Connect with your favorite tools and services.
          </p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate mb-2">Collaboration</h3>
          <p className="fs-sm tc-slate-6 m-0">
            Work together with your team in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
