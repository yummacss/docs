export default function CheckboxGroup() {
  return (
    <fieldset className="bo-0 p-0 m-0 d-f fd-c g-3">
      <legend className="fs-sm fw-600 c-slate p-0">
        Notification Preferences
      </legend>
      <div className="d-f fd-c g-2">
        <div className="d-f ai-c g-2">
          <input type="checkbox" id="email" className="d-4 ac-slate" />
          <label htmlFor="email" className="fs-sm c-slate">
            Email
          </label>
        </div>
        <div className="d-f ai-c g-2">
          <input type="checkbox" id="sms" className="d-4 ac-slate" />
          <label htmlFor="sms" className="fs-sm c-slate">
            SMS
          </label>
        </div>
        <div className="d-f ai-c g-2">
          <input type="checkbox" id="push" className="d-4 ac-slate" />
          <label htmlFor="push" className="fs-sm c-slate">
            Push Notifications
          </label>
        </div>
      </div>
    </fieldset>
  );
}
