export default function ContactSectionBasic() {
  return (
    <div className="py-12 px-6">
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
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Phone</h3>
          <p className="fs-sm tc-silver-10 m-0">+1 (555) 000-0000</p>
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
    </div>
  );
}
