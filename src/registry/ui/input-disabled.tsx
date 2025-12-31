export default function InputDisabled() {
  return (
    <div className="d-f fd-c g-2">
      <label htmlFor="disabled-input" className="fw-600 c-silver-12">
        Email
      </label>
      <input
        id="disabled-input"
        disabled
        type="text"
        placeholder="A disabled input"
        className="bw-1 bc-silver-4 c-black px-3 py-2 br-0 fs-md f:oc-silver-1 f:os-s f:ow-2"
      />
    </div>
  );
}
