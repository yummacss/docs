export default function CheckboxDisabled() {
  return (
    <div className="d-f fd-c g-3">
      <div className="d-f ai-c g-2">
        <input
          type="checkbox"
          id="checkbox-disabled"
          className="d-4 ac-slate"
          disabled
        />
        <label htmlFor="checkbox-disabled" className="fs-sm c-slate-6">
          Disabled unchecked
        </label>
      </div>
      <div className="d-f ai-c g-2">
        <input
          type="checkbox"
          id="checkbox-disabled-checked"
          className="d-4 ac-slate"
          disabled
          defaultChecked
        />
        <label htmlFor="checkbox-disabled-checked" className="fs-sm c-slate-6">
          Disabled checked
        </label>
      </div>
    </div>
  );
}
