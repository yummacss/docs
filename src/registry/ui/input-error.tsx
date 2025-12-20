export default function InputError() {
  return (
    <div className="d-f fd-c g-1">
      <label htmlFor="error-input" className="fw-600 tc-slate-9">
        Phone number <span className="tc-slate-9 us-none">*</span>
      </label>
      <input
        id="error-input"
        type="tel"
        placeholder="(123) 456-7890"
        className="bg-red-1/15 tc-red px-3 py-2 rad-0 fs-md bc-red-6 b-1 f:oc-red-2 f:os-s f:ow-2"
      />
      <span className="tc-red fs-sm">Invalid phone number.</span>
    </div>
  );
}
