export default function BadgeIcon() {
  return (
    <span className="d-if ai-c jc-c g-1 bg-blue-1 b-1 bc-blue-4 tc-blue-10 px-2 py-1 rad-0 fs-xs fw-600 lh-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <p>Verified</p>
    </span>
  );
}

