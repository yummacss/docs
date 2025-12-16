export default function AccordionSeparated() {
  return (
    <div className="d-f fd-c g-2">
      <details className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Is Yumma CSS free?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Expand</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">Yes, Yumma CSS is completely free and open-source. You can use it in personal and commercial projects.</p>
        </div>
      </details>
      <details className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Can I use it with React?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Expand</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">Absolutely! Yumma CSS is framework-agnostic and works perfectly with React, Vue, Svelte, and vanilla HTML.</p>
        </div>
      </details>
      <details open className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Is Yumma UI mobile friendly?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Expand</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">Yes, Yumma UI is mobile-friendly and works great on all devices.</p>
        </div>
      </details>
    </div>
  );
}

