export default function ContactSectionForm() {
  return (
    <section className="py-12 px-6">
      <div className="d-f fw-w g-12">
        <div className="f-1 min-w-64">
          <h2 className="ff-s fs-3xl fw-600 c-slate-10 mb-2">Contact us</h2>
          <p className="fs-md c-silver-10 mb-6 m-0">
            We'd love to hear from you. Reach out anytime.
          </p>
          <div className="d-f fd-c g-4">
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M224,200v8a32,32,0,0,1-32,32H136"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M224,128H192a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h32V128a96,96,0,1,0-192,0v56a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V144a16,16,0,0,0-16-16H32"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Live Chat</p>
                <p className="fs-sm c-silver-10 m-0">
                  Chat with us in real-time
                </p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="128"
                    cy="128"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M184,208c-15.21,10.11-36.37,16-56,16a96,96,0,1,1,96-96c0,22.09-8,40-28,40s-28-17.91-28-40V88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Email</p>
                <p className="fs-sm c-silver-10 m-0">company@example.com</p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 br-pill bw-1 bc-silver-4 c-slate-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <line
                    x1="56"
                    y1="232"
                    x2="200"
                    y2="232"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <circle
                    cx="128"
                    cy="104"
                    r="32"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
              </div>
              <div>
                <p className="fs-sm fw-600 c-slate-9 m-0">Address</p>
                <p className="fs-sm c-silver-10 m-0">
                  123 Main St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="f-1 min-w-64">
          <form className="d-f fd-c g-4">
            <div className="d-f fd-c g-1">
              <label htmlFor="name" className="fs-sm fw-600 c-slate-9">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2"
              />
            </div>
            <div className="d-f fd-c g-1">
              <label htmlFor="email" className="fs-sm fw-600 c-slate-9">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2"
              />
            </div>
            <div className="d-f fd-c g-1">
              <label htmlFor="message" className="fs-sm fw-600 c-slate-9">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                rows={4}
                className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2 rz-n"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 br-0 fs-sm fw-600 bg-slate-8 c-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
