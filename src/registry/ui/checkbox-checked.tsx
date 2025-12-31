export default function CheckboxChecked() {
  return (
    <div className="d-f ai-c g-2">
      <input
        type="checkbox"
        id="checkbox-checked"
        className="d-4 ac-slate"
        defaultChecked
      />
      <label htmlFor="checkbox-checked" className="fs-sm c-slate">
        Email notifications
      </label>
    </div>
  );
}
