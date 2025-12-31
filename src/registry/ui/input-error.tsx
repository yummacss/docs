export default function InputError() {
  return (
    <div className="d-f fd-c g-1">
      <label htmlFor="error-input" className="fw-600 c-silver-12">
        Phone number <span className="c-slate-9 us-none">*</span>
      </label>
      <input
        id="error-input"
        type="tel"
        placeholder="(123) 456-7890"
        className="bg-red-1/15 c-red px-3 py-2 br-0 fs-md bc-red-6 bw-1 f:oc-red-2 f:os-s f:ow-2"
        aria-describedby="error-input-message"
        aria-invalid="true"
      />
      <span id="error-input-message" className="c-red fs-sm">
        Invalid phone number.
      </span>
    </div>
  );
}
