import Checkbox from "./checkbox";
import Dialog from "./dialog";
import Field from "./field";

export default function DialogSignUp({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog container={container}
      trigger="Sign up"
      title="Create account"
      confirmLabel="Create account"
    >
      <div className="d-f fd-c g-4">
        <Field fullWidth label="Full name" placeholder="John Smith" />
        <Field
          fullWidth
          type="email"
          label="Email"
          placeholder="you@company.com"
        />
        <div className="d-g g-3 @sm:gtc-2">
          <Field
            fullWidth
            type="password"
            label="Password"
            placeholder="••••••••"
          />
          <Field
            fullWidth
            type="password"
            label="Confirm"
            placeholder="••••••••"
          />
        </div>
        <Checkbox
          label={
            <>
              I agree to the{" "}
              <a href="#" className="c-indigo td-none h:td-u">
                Terms of Service
              </a>
            </>
          }
        />
      </div>
    </Dialog>
  );
}
