export default function AuthFormBasicSignIn() {
  return (
    <div className="p-8 b-1 bc-silver-4 rad-0">
      <div className="max-w-sm">
        <h2 className="ff-s fs-xxl fw-600 tc-slate-9 mb-2">Welcome back</h2>
        <p className="fs-sm tc-slate-6 mb-6">
          Enter your credentials to sign in to your account.
        </p>
        <form className="d-f fd-c g-4">
          <div className="d-f fd-c g-1">
            <label htmlFor="email" className="fs-sm fw-600 tc-slate-9">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2"
            />
          </div>
          <div className="d-f fd-c g-1">
            <label htmlFor="password" className="fs-sm fw-600 tc-slate-9">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2"
            />
          </div>
          <div className="d-f jc-sb ai-c">
            <div className="d-f ai-c g-2">
              <input type="checkbox" id="remember" className="d-4 ac-slate" />
              <label htmlFor="remember" className="fs-sm tc-slate-6">
                Keep me logged in
              </label>
            </div>
            <a href="/" className="fs-sm tc-slate-6 h:tc-slate">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rad-0 fs-sm fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Sign in
          </button>
        </form>
        <p className="fs-sm tc-slate-6 ta-c mt-6">
          Don't have an account?{" "}
          <a href="/" className="tc-slate fw-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
