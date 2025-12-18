export default function BannerFloating() {
  return (
    <div className="w-full o-h">
      <div className="bg-black tc-white px-4 py-3 rad-0 d-f ai-c jc-sb fs-sm fw-500">
        <span>
          This website uses cookies to ensure you get the best experience.
        </span>
        <div className="d-f ai-c g-3">
          <button
            type="button"
            className="bg-transparent b-1 bc-white tc-white px-3 py-1 rad-0 fs-xs fw-600 h:bg-white h:tc-black"
          >
            Decline
          </button>
          <button
            type="button"
            className="bg-white tc-black px-3 py-1 rad-0 fs-xs fw-600 h:bg-silver-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
