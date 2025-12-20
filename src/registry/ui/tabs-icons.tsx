export default function TabsIcons() {
  return (
    <div className="bg-silver-1 p-1 rad-0 d-if b-1 bc-silver-4">
      <button
        type="button"
        className="d-f ai-c g-2 fw-500 tc-black bg-white px-4 py-2 rad-0 b-1 bc-silver-4 sh-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <rect
            x="48"
            y="48"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="144"
            y="48"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="48"
            y="144"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="144"
            y="144"
            width="64"
            height="64"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
        <span>Grid</span>
      </button>
      <button
        type="button"
        className="d-f ai-c g-2 fw-500 tc-silver-10 px-4 py-2 h:tc-black tr-c"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="88"
            y1="64"
            x2="216"
            y2="64"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="88"
            y1="128"
            x2="216"
            y2="128"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="88"
            y1="192"
            x2="216"
            y2="192"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <circle cx="44" cy="64" r="12" fill="currentColor" />
          <circle cx="44" cy="128" r="12" fill="currentColor" />
          <circle cx="44" cy="192" r="12" fill="currentColor" />
        </svg>
        <span>List</span>
      </button>
    </div>
  );
}
