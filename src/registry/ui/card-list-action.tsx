export default function CardListAction() {
  return (
    <div className="d-f fd-c g-4 max-w-md">
      <div className="d-f ai-c g-4 p-4 b-1 bc-silver-4 rad-0">
        <div className="d-10 rad-9 o-h">
          <img
            src="/img/people/phoenix-baker.jpg"
            alt="Avatar"
            className="w-full h-full of-c"
          />
        </div>
        <div className="f-1">
          <h4 className="ff-s fs-sm fw-600 tc-slate mb-1">Phoenix Baker</h4>
          <p className="fs-xs tc-slate-6 m-0">Engineering Manager</p>
        </div>
        <button
          type="button"
          className="px-3 py-1 rad-0 fs-xs fw-600 bg-white tc-slate b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
        >
          Edit
        </button>
      </div>
      <div className="d-f ai-c g-4 p-4 b-1 bc-silver-4 rad-0">
        <div className="d-10 rad-9 o-h">
          <img
            src="/img/people/kelly-williams.jpg"
            alt="Avatar"
            className="w-full h-full of-c"
          />
        </div>
        <div className="f-1">
          <h4 className="ff-s fs-sm fw-600 tc-slate mb-1">Kelly Williams</h4>
          <p className="fs-xs tc-slate-6 m-0">Frontend Developer</p>
        </div>
        <button
          type="button"
          className="px-3 py-1 rad-0 fs-xs fw-600 bg-white tc-slate b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
