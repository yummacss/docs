export default function ContactSectionBasic() {
  return (
    <section className="py-12 px-6">
      <h2 className="ff-s fs-3xl fw-600 tc-slate-10 mb-6">Contact us</h2>
      <div className="d-g gtc-1 sm:gtc-3 g-6">
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Live Chat</h3>
          <p className="fs-sm tc-silver-10 m-0">Chat with us in real-time</p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Email</h3>
          <p className="fs-sm tc-silver-10 m-0">company@example.com</p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
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
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Office</h3>
          <p className="fs-sm tc-silver-10 m-0">123 Main St, City</p>
        </div>
      </div>
    </section>
  );
}
