export default function NewsletterSectionCentered() {
  return (
    <div className="py-12 px-6 ta-c">
      <div className="max-w-md m-auto">
        <div className="d-f jc-c mb-4">
          <div className="d-f ai-c jc-c d-12 rad-9 bg-slate-8 tc-white">
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
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        </div>
        <h2 className="ff-s fs-xxl fw-600 tc-slate-10 mb-2">
          Subscribe to our newsletter
        </h2>
        <p className="fs-sm tc-silver-10 mb-6 m-0">
          Join thousands of subscribers and get weekly insights.
        </p>
        <div className="d-f g-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="f-1 b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2"
          />
          <button
            type="submit"
            className="ai-c d-f jc-c px-4 py-2 rad-0 fs-sm fw-500 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Subscribe
          </button>
        </div>
        <p className="fs-xs tc-silver-8 mt-3 m-0">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
