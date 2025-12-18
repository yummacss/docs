export default function BreadcrumbCollapsed() {
  return (
    <nav className="d-f ai-c b-1 bc-silver-4 p-3 rad-0 fs-sm tc-silver-10">
      <a href="/" className="h:tc-black td-none">
        Dashboard
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 mx-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span className="d-f ai-c jc-c">
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
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 mx-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span className="tc-black fw-600">Security</span>
    </nav>
  );
}
