export default function InputLabel() {
  return (
    <div className="d-f fd-c g-2">
      <label htmlFor="email" className="tc-silver-12 fw-600">
        Email
      </label>
      <input id="email" type="email" placeholder="you@examlpe.com" className="b-1 bc-silver-4 tc-black px-3 py-2 rad-0 fs-md f:oc-silver-1 f:os-s f:ow-2" />
    </div>
  );
}

