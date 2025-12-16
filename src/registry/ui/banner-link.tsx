export default function BannerLink() {
  return (
    <div className="bg-indigo-9 tc-white px-4 py-3 d-f ai-c jc-sb fs-sm fw-500">
      <div className="d-f ai-c g-2">
        <span>Check out our brand new merchendise!</span>
        <a href="/" className="tc-white td-u fw-700">
          Shop now
        </a>
      </div>
      <button type="button" className="bg-transparent b-none tc-white o-50 h:o-100">
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
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

