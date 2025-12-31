export default function CtaSectionColored() {
  return (
    <div className="py-6 px-6 d-f ai-c jc-sb fw-w g-4 bg-indigo-8">
      <h2 className="ff-s fs-3xl fw-600 c-white m-0">Start for free today!</h2>
      <div className="d-f g-3">
        <button
          type="button"
          className="px-4 py-2 br-0 fs-sm fw-600 bg-white c-indigo-8 h:bg-silver-2"
        >
          Start free trial
        </button>
        <button
          type="button"
          className="px-4 py-2 br-0 fs-sm fw-600 bg-transparent c-white bw-1 bc-white/30 h:bg-white/10 f:oc-white/30 f:os-s f:ow-2"
        >
          Pricings
        </button>
      </div>
    </div>
  );
}
