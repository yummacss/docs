export default function ButtonGroupBasic() {
  return (
    <div className="d-f fd-c g-2">
      <p className="fs-xs tc-slate-5 fw-600">Position</p>
      <div className="d-f">
        <button
          type="button"
          className="px-4 py-2 rad-l-0 fs-sm fw-600 bg-white tc-slate b-1 bc-silver-4 h:bg-silver-1"
        >
          Left
        </button>
        <button
          type="button"
          className="px-4 py-2 fs-sm fw-600 bg-white tc-slate b-1 bl-0 bc-silver-4 h:bg-silver-1"
        >
          Center
        </button>
        <button
          type="button"
          className="px-4 py-2 rad-r-0 fs-sm fw-600 bg-white tc-slate b-1 bl-0 bc-silver-4 h:bg-silver-1"
        >
          Right
        </button>
      </div>
    </div>
  );
}
