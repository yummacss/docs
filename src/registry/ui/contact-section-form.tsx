export default function ContactSectionForm() {
  return (
    <div className="py-12 px-6">
      <div className="d-f fw-w g-12">
        <div className="f-1 min-w-64">
          <h2 className="ff-s fs-3xl fw-600 tc-slate-10 mb-2">Contact us</h2>
          <p className="fs-md tc-silver-10 mb-6 m-0">
            We'd love to hear from you. Reach out anytime.
          </p>
          <div className="d-f fd-c g-4">
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
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
                <p className="fs-sm fw-600 tc-slate-9 m-0">Live Chat</p>
                <p className="fs-sm tc-silver-10 m-0">
                  Chat with us in real-time
                </p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M164.39,145.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
              </div>
              <div>
                <p className="fs-sm fw-600 tc-slate-9 m-0">Phone</p>
                <p className="fs-sm tc-silver-10 m-0">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="d-f ai-c g-3">
              <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
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
                <p className="fs-sm fw-600 tc-slate-9 m-0">Address</p>
                <p className="fs-sm tc-silver-10 m-0">
                  123 Main St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="f-1 min-w-64">
          <form className="d-f fd-c g-4">
            <div className="d-f fd-c g-1">
              <label htmlFor="name" className="fs-sm fw-600 tc-slate-9">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2"
              />
            </div>
            <div className="d-f fd-c g-1">
              <label htmlFor="email" className="fs-sm fw-600 tc-slate-9">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2"
              />
            </div>
            <div className="d-f fd-c g-1">
              <label htmlFor="message" className="fs-sm fw-600 tc-slate-9">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                rows={4}
                className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2 rz-n"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rad-0 fs-sm fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
