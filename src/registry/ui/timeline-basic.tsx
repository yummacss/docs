export default function TimelineBasic() {
  return (
    <div className="d-f fd-c g-4">
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="w-3 h-3 rad-9 bg-slate-8 fs-0"></div>
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">Account Created</p>
          <p className="fs-xs tc-silver-10 mb-2">October 10, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            The user account was successfully created and verified.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="w-3 h-3 rad-9 bg-slate-8 fs-0"></div>
          <div className="w-px h-full bg-silver-2 my-1"></div>
        </div>
        <div className="pb-4">
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">
            Subscription Started
          </p>
          <p className="fs-xs tc-silver-10 mb-2">October 12, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            The Pro plan subscription has been activated.
          </p>
        </div>
      </div>
      <div className="d-f g-4">
        <div className="d-f fd-c ai-c">
          <div className="w-3 h-3 rad-9 bg-slate-8 fs-0"></div>
        </div>
        <div>
          <p className="fs-sm fw-500 tc-slate-8 mb-1 fw-600">
            Payment Received
          </p>
          <p className="fs-xs tc-silver-10 mb-2">October 14, 2024</p>
          <p className="fs-sm tc-silver-12 lh-4">
            Monthly payment of $29.00 was successfully processed.
          </p>
        </div>
      </div>
    </div>
  );
}
