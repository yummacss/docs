export default function DropdownBasic() {
  return (
    <div className="d-ib">
      <button
        type="button"
        className="d-f ai-c g-2 px-4 py-2 rad-0 fs-sm fw-600 bg-white tc-slate-8 b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
      >
        <span>Actions</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="208 96 128 176 48 96"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>
      <div className="mt-1 p-1 bg-white b-1 bc-silver-4 rad-0 bs-3 min-w-40">
        <button
          type="button"
          className="d-b w-full ta-l px-3 py-2 rad-0 fs-sm tc-slate-8 bg-transparent b-0 h:bg-silver-1 c-p"
        >
          New file
        </button>
        <button
          type="button"
          className="d-b w-full ta-l px-3 py-2 rad-0 fs-sm tc-slate-8 bg-transparent b-0 h:bg-silver-1 c-p"
        >
          Copy link
        </button>
        <button
          type="button"
          className="d-b w-full ta-l px-3 py-2 rad-0 fs-sm tc-slate-8 bg-transparent b-0 h:bg-silver-1 c-p"
        >
          Edit file
        </button>
        <hr className="my-1 b-0 bt-1 bc-silver-4" />
        <button
          type="button"
          className="d-b w-full ta-l px-3 py-2 rad-0 fs-sm tc-red bg-transparent b-0 h:bg-red-1 cu-p"
        >
          Delete file
        </button>
      </div>
    </div>
  );
}
