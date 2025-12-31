export default function BannerFloating() {
  return (
    <div className="w-full o-h">
      <div className="bg-black c-white px-4 py-3 br-0 d-f ai-c jc-sb fs-sm fw-500">
        <span>
          This website uses cookies to ensure you get the best experience.
        </span>
        <div className="d-f ai-c g-3">
          <button
            type="button"
            className="bg-transparent bw-1 bc-white c-white px-3 py-1 br-0 fs-xs fw-600 h:bg-white h:c-black"
          >
            Decline
          </button>
          <button
            type="button"
            className="bg-white c-black px-3 py-1 br-0 fs-xs fw-600 h:bg-silver-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
