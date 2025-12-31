export default function BreadcrumbChevrons() {
  return (
    <nav className="d-f ai-c bw-1 bc-silver-4 p-3 br-0 fs-sm c-silver-10">
      <a href="/" className="h:c-black td-none">
        Dashboard
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 mx-2"
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
      <a href="/" className="h:c-black td-none">
        Profile
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 mx-2"
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
      <span className="c-black fw-600">Security</span>
    </nav>
  );
}
