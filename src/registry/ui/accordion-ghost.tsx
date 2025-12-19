export default function AccordionGhost() {
  return (
    <div className="d-f fd-c">
      <details className="bb-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Is Yumma CSS free?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <title>Expand</title>
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">
            Yes, Yumma CSS is completely free and open-source. You can use it in
            personal and commercial projects.
          </p>
        </div>
      </details>
      <details className="bb-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Can I use it with React?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <title>Expand</title>
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">
            Absolutely! Yumma CSS is framework-agnostic and works perfectly with
            React, Vue, Svelte, and vanilla HTML.
          </p>
        </div>
      </details>
      <details open className="bb-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <h4 className="ff-s tc-slate">Is Yumma UI mobile friendly?</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fs-lg tc-slate-8 h-4 w-4"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <title>Expand</title>
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </summary>
        <div className="px-4 pb-4 tc-slate fs-sm lh-4">
          <p className="tc-slate-6">
            Yes, Yumma UI is mobile-friendly and works great on all devices.
          </p>
        </div>
      </details>
    </div>
  );
}
