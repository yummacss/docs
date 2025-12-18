export default function ButtonGroupActive() {
  return (
    <div className="d-f">
      <button
        type="button"
        className="px-4 py-2 rad-l-0 fs-sm fw-600 bg-slate-4 tc-white b-1 bc-slate-8"
      >
        Day
      </button>
      <button
        type="button"
        className="px-4 py-2 fs-sm fw-600 bg-white tc-slate b-1 bl-0 bc-silver-4 h:bg-silver-1"
      >
        Week
      </button>
      <button
        type="button"
        className="px-4 py-2 rad-r-0 fs-sm fw-600 bg-white tc-slate b-1 bl-0 bc-silver-4 h:bg-silver-1"
      >
        Month
      </button>
    </div>
  );
}
