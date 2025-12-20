export default function PaginationEllipsis() {
  return (
    <nav className="d-f ai-c g-1">
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 h:bg-silver-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="160 208 80 128 160 48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 bg-slate-8 tc-white"
      >
        1
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 h:bg-silver-1"
      >
        2
      </a>
      <span className="d-f ai-c jc-c d-9 fs-sm tc-silver-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <circle cx="128" cy="128" r="12" fill="currentColor" />
          <circle cx="196" cy="128" r="12" fill="currentColor" />
          <circle cx="60" cy="128" r="12" fill="currentColor" />
        </svg>
      </span>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 h:bg-silver-1"
      >
        9
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 h:bg-silver-1"
      >
        10
      </a>
      <a
        href="/"
        className="d-f ai-c jc-c d-9 rad-9 fs-sm fw-500 tc-slate-8 h:bg-silver-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="96 48 176 128 96 208"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </a>
    </nav>
  );
}
