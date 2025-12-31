export default function AuthFormBasicSignUp() {
  return (
    <div className="p-8 bw-1 bc-silver-4 br-0">
      <div className="max-w-sm">
        <h2 className="ff-s fs-xxl fw-600 c-slate-9 mb-2">Create an account</h2>
        <p className="fs-sm c-slate-6 mb-6">
          Enter your credentials to sign up to your account.
        </p>
        <form className="d-f fd-c g-4">
          <div className="d-f fd-c g-1">
            <label htmlFor="name" className="fs-sm fw-600 c-slate-9">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2"
            />
          </div>
          <div className="d-f fd-c g-1">
            <label htmlFor="email" className="fs-sm fw-600 c-slate-9">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2"
            />
          </div>
          <div className="d-f fd-c g-1">
            <label htmlFor="password" className="fs-sm fw-600 c-slate-9">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bw-1 bc-silver-4 br-0 fs-sm c-black f:oc-silver-1 f:os-s f:ow-2"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 br-0 fs-sm fw-600 bg-slate-8 c-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
          >
            Create account
          </button>
        </form>
        <p className="fs-sm c-slate-6 ta-c mt-6">
          Already have an account?{" "}
          <a href="/" className="c-slate fw-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
