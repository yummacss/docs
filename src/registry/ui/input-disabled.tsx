export default function InputDisabled() {
  return (
    <div className="d-f fd-c g-2">
      <label htmlFor="email" className="fw-600 tc-slate-9">
        Email
      </label>
      <input disabled type="text" placeholder="A disabled input" className="b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2" />
    </div>
  );
}

