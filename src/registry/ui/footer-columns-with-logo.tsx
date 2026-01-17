export default function FooterColumnsWithLogo() {
  return (
    <footer className="py-12 px-6 btw-1 bc-silver-4">
      <div className="d-f fw-w g-12 mb-10">
        <div className="f-2 min-w-48">
          {/* biome-ignore lint: This is a demo component */}
          <img
            src="https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/66eeb02f5dfb43eaea30f1fd_3Portals.svg"
            alt="3Portals"
            className="h-6 mb-4"
          />
          <p className="fs-sm c-silver-10 m-0">
            Building exceptional products with modern design and reliable
            infrastructure.
          </p>
        </div>
        <div className="f-1 min-w-16">
          <h4 className="ff-s fs-sm fw-600 c-slate-10 mb-4">Product</h4>
          <ul className="d-f fd-c g-3 p-0">
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Features
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Pricing
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Changelog
              </a>
            </li>
          </ul>
        </div>
        <div className="f-1 min-w-16">
          <h4 className="ff-s fs-sm fw-600 c-slate-10 mb-4">3Portals</h4>
          <ul className="d-f fd-c g-3 p-0">
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                About
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Blog
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div className="f-1 min-w-16">
          <h4 className="ff-s fs-sm fw-600 c-slate-10 mb-4">Support</h4>
          <ul className="d-f fd-c g-3 p-0">
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Help Center
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Contact
              </a>
            </li>
            <li>
              <a href="/" className="fs-sm c-silver-10 td-none h:c-slate-8">
                Status
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="btw-1 bc-silver-4 pt-6">
        <p className="fs-sm c-silver-10 m-0">
          © 2025 3Portals. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
