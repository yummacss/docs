export default function PaginationOutline() {
  return (
    <nav className="d-f ai-c g-1">
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Previous page</title>
          <path d="m15 18-6-6 6-6" />
        </svg>
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 bg-slate-8 tc-white b-1 bc-slate-8"
      >
        1
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        2
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        3
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        4
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        5
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 b-1 bc-silver-4 h:bg-silver-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Next page</title>
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </nav>
  );
}
