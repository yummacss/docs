export default function AccordionIcons() {
  return (
    <div className="d-f fd-c g-2">
      <details className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-slate-8"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <title>Info</title>
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
            </svg>
            <h4 className="ff-s tc-slate">Is Yumma CSS free?</h4>
          </div>
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
      <details className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-slate-8"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <title>Info</title>
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
            </svg>
            <h4 className="ff-s tc-slate">Can I use it with React?</h4>
          </div>
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
      <details open className="b-1 bc-silver-2">
        <summary className="p-4 c-p d-f jc-sb ai-c lst-none fw-600 rad-0">
          <div className="d-f ai-c g-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 tc-slate-8"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <title>Info</title>
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
            </svg>
            <h4 className="ff-s tc-slate">Is Yumma UI mobile friendly?</h4>
          </div>
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
