export default function ButtonIconLabel() {
  return (
    <button type="button" className="ai-c d-f jc-c g-2 px-3 py-2 rad-0 fs-sm fw-600 lh-1 bg-slate-8 tc-white f:oc-silver-4 f:os-s f:ow-2">
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
        <path d="M12 2v13" />
        <path d="m16 6-4-4-4 4" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      </svg>
      <span>Share</span>
    </button>
  );
}

