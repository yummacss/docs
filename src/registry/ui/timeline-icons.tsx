export default function TimelineIcons() {
  return (
    <div className="d-f fd-c g-4">
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 rad-9 bg-silver-2 tc-black fs-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">Profile Updated</p>
          <p className="fs-xs tc-silver-10 mb-2">November 01, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            User updated their profile picture and bio information.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 rad-9 bg-silver-2 tc-black fs-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">New Message</p>
          <p className="fs-xs tc-silver-10 mb-2">November 03, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            You received a new message from the support team regarding your
            ticket.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="d-f ai-c jc-c w-8 h-8 rad-9 bg-silver-2 tc-black fs-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        </div>
        <div className="pt-1">
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">Location Added</p>
          <p className="fs-xs tc-silver-10 mb-2">November 05, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            A new shipping address was added to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
