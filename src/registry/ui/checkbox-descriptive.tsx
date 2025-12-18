export default function CheckboxDescriptive() {
  return (
    <div className="d-f as-fs g-2">
      <input
        type="checkbox"
        id="checkbox-desc"
        className="d-4 ac-slate mt-1"
        defaultChecked
      />
      <div>
        <label htmlFor="checkbox-desc" className="fs-sm fw-600 tc-slate d-b">
          Marketing emails
        </label>
        <p className="fs-sm tc-slate-6 m-0">
          Receive emails about new products and features.
        </p>
      </div>
    </div>
  );
}
