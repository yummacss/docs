export default function ButtonIconLabel() {
  return (
    <button
      type="button"
      className="ai-c d-f jc-c g-2 px-3 py-2 rad-0 fs-sm fw-600 lh-1 bg-slate-8 tc-white f:oc-silver-4 f:os-s f:ow-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 256 256"
        aria-hidden="true"
      >
        <rect width="256" height="256" fill="none" />
        <path
          d="M176,104h24a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H80"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <polyline
          points="88 64 128 24 168 64"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="128"
          y1="24"
          x2="128"
          y2="136"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
      </svg>
      <span>Share</span>
    </button>
  );
}
