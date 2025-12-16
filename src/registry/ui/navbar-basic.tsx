export default function NavbarBasic() {
  return (
    <nav className="bb-1 bc-silver-2 bg-white px-6 py-4">
      <div className="ai-c d-f jc-sb max-w-xl mx-auto">
        <div className="d-f ai-c g-6">
          <a href="/" className="fs-xl fw-600 tc-black td-none">
            Brand
          </a>
          <div className="d-none md:d-f g-6">
            <a href="/" className="fs-sm h:tc-black tc-slate-7 td-none">
              Product
            </a>
            <a href="/" className="fs-sm h:tc-black tc-slate-7 td-none">
              Resources
            </a>
            <a href="/" className="fs-sm h:tc-black tc-slate-7 td-none">
              Pricing
            </a>
          </div>
        </div>

        <div className="d-none md:d-b">
          <a
            href="/"
            className="b-1 bc-silver-4 fs-sm h:bg-silver-1 px-4 py-2 rad-0 tc-black td-none f:oc-silver-1 f:os-s f:ow-2"
          >
            Sign in
          </a>
        </div>

        <input type="checkbox" id="nav-toggle-basic" className="d-none" />
        <label
          htmlFor="nav-toggle-basic"
          className="d-f ai-c jc-c c-p rad-0 px-2 py-2 b-1 bc-silver-2 bg-white h:bg-silver-2 d-f md:d-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 tc-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </label>
      </div>
    </nav>
  );
}
