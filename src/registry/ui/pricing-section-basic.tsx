export default function PricingSectionBasic() {
  return (
    <div className="py-12 px-6">
      <div className="ta-c mb-10">
        <h2 className="ff-s fs-3xl fw-600 tc-slate-10 mb-2">
          Simple, transparent pricing
        </h2>
        <p className="fs-md tc-silver-10 m-0">
          Choose the plan that works best for you
        </p>
      </div>
      <div className="d-f fw-w jc-c g-6">
        <div className="w-72 b-1 bc-silver-4 rad-0 p-6 d-f fd-c">
          <div className="mb-6">
            <h3 className="ff-s fs-lg fw-600 tc-slate-10 mb-1">Free</h3>
            <p className="fs-sm tc-silver-10 m-0">
              For individuals getting started
            </p>
          </div>
          <div className="mb-6">
            <span className="fs-4xl fw-700 tc-slate-10">€0</span>
            <span className="fs-sm tc-silver-10">/month</span>
          </div>
          <ul className="d-f fd-c g-3 mb-6 p-0">
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Up to 3 projects</span>
            </li>
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Basic analytics</span>
            </li>
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Community support</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-auto ai-c d-f jc-c px-4 py-2 rad-0 fs-sm fw-500 bg-white tc-slate-8 b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
          >
            Get started
          </button>
        </div>
        <div className="w-72 b-2 bc-slate-8 rad-0 p-6 d-f fd-c">
          <div className="mb-6">
            <div className="d-f ai-c jc-sb mb-1">
              <h3 className="ff-s fs-lg fw-600 tc-slate-10 m-0">Premium</h3>
              <span className="bg-slate-9 tc-white px-2 py-1 rad-0 fs-xs fw-500">
                Popular
              </span>
            </div>
            <p className="fs-sm tc-silver-10 m-0">
              For growing teams and businesses
            </p>
          </div>
          <div className="mb-6">
            <span className="fs-4xl fw-700 tc-slate-10">€59</span>
            <span className="fs-sm tc-silver-10">/month</span>
          </div>
          <ul className="d-f fd-c g-3 mb-6 p-0">
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Unlimited projects</span>
            </li>
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Advanced analytics</span>
            </li>
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Priority support</span>
            </li>
            <li className="d-f ai-c g-2">
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
              <span className="fs-sm tc-slate-8">Custom integrations</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-auto ai-c d-f jc-c px-4 py-2 rad-0 fs-sm fw-500 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
