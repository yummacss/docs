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
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <title>Live Chat</title>
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Live Chat</h3>
          <p className="fs-sm tc-silver-10 m-0">Chat with us in real-time</p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Phone</title>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Phone</h3>
          <p className="fs-sm tc-silver-10 m-0">+1 (555) 000-0000</p>
        </div>
        <div className="p-6 b-1 bc-silver-4 rad-0">
          <div className="d-f ai-c jc-c d-10 rad-9 bg-silver-1 tc-slate mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Office</title>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="ff-s fs-md fw-600 tc-slate-10 mb-1">Office</h3>
          <p className="fs-sm tc-silver-10 m-0">123 Main St, City</p>
        </div>
      </div>
    </div>
  );
}
