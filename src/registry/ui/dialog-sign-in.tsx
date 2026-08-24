import Checkbox from "./checkbox";
import Dialog from "./dialog";
import Field from "./field";

export default function DialogSignIn({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog container={container} trigger="Sign in" title="Sign in" confirmLabel="Sign in">
      <div className="d-f fd-c g-4">
        <Field
          fullWidth
          type="email"
          label="Email"
          placeholder="you@company.com"
        />
        <Field
          fullWidth
          type="password"
          label="Password"
          placeholder="••••••••"
        />
        <div className="d-g g-3 @sm:gtc-2">
          <Checkbox defaultChecked label="Remember me" />
          <div className="ta-r">
            <a href="#" className="c-indigo fs-sm td-none h:td-u">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
