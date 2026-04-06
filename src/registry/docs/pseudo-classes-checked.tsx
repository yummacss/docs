export default function PseudoClassesChecked() {
  return (
    <div className="d-f g-2 ai-c">
      <input
        id="checked-checkbox"
        type="checkbox"
        className="w-4 h-4 bc-silver-3 br-sm bw-1 c-p appearance-none"
        checked
        readOnly
      />
      <label
        htmlFor="checked-checkbox"
        className="c-slate-10 fw-600 fs-sm c:bg-indigo-4"
      >
        Checked checkbox
      </label>
    </div>
  );
}
