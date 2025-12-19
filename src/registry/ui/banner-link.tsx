export default function BannerLink() {
  return (
    <div className="bg-indigo-9 tc-white px-4 py-3 d-f ai-c jc-sb fs-sm fw-500">
      <div className="d-f ai-c g-2">
        <span>Check out our brand new merchendise!</span>
        <a href="/" className="tc-white td-u fw-700">
          Shop now
        </a>
      </div>
      <button
        type="button"
        className="bg-transparent b-none tc-white o-50 h:o-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="200"
            y1="56"
            x2="56"
            y2="200"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="200"
            y1="200"
            x2="56"
            y2="56"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>
    </div>
  );
}
