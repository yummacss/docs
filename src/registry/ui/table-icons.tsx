export default function TableIcons() {
  return (
    <div className="o-x-auto w-full b-1 bb-0 bc-silver-2 rad-0 bg-white">
      <table className="w-full ta-l bc-c">
        <thead>
          <tr>
            <th className="bb-1 bc-silver-4 tc-silver-10 fs-sm fw-500 px-4 py-3">
              Name
            </th>
            <th className="bb-1 bc-silver-4 tc-silver-10 fs-sm fw-500 px-4 py-3">
              Status
            </th>
            <th className="bb-1 bc-silver-4 tc-silver-10 fs-sm fw-500 px-4 py-3">
              Role
            </th>
            <th className="bb-1 bc-silver-4 tc-silver-10 fs-sm fw-500 px-4 py-3">
              Position
            </th>
            <th className="bb-1 bc-silver-4 tc-silver-10 fs-sm fw-500 px-4 py-3 ta-r"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/phoenix-baker.jpg"
                  alt="Phoenix Baker"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 tc-black">Phoenix Baker</span>
                  <span className="fs-xs tc-silver-10">@phoenix</span>
                </div>
              </div>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <span className="d-if ai-c px-2 py- rad-0 fs-xs fw-500 bg-green-1/50 tc-green b-1 bc-green-2">
                Online
              </span>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Engineering Manager
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Admin
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black ta-r">
              <a href="/" className="tc-slate fw-500 td-none h:td-u">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Options</title>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </a>
            </td>
          </tr>
          <tr>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/kaitlin-hale.jpg"
                  alt="Kaitlin Hale"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 tc-black">Kaitlin Hale</span>
                  <span className="fs-xs tc-silver-10">@kaitlin</span>
                </div>
              </div>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <span className="d-if ai-c px-2 py- rad-0 fs-xs fw-500 bg-red-1/50 tc-red b-1 bc-red-2">
                Offline
              </span>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Product Manager
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Member
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black ta-r">
              <a href="/" className="tc-slate fw-500 td-none h:td-u">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Options</title>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </a>
            </td>
          </tr>
          <tr>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/kelly-williams.jpg"
                  alt="Kelly Williams"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 tc-black">Kelly Williams</span>
                  <span className="fs-xs tc-silver-10">@kelly</span>
                </div>
              </div>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black">
              <span className="d-if ai-c px-2 py- rad-0 fs-xs fw-500 bg-green-1/50 tc-green b-1 bc-green-2">
                Online
              </span>
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Frontend Developer
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-silver-10">
              Member
            </td>
            <td className="bb-1 bc-silver-2 px-4 py-3 fs-sm tc-black ta-r">
              <a href="/" className="tc-slate fw-500 td-none h:td-u">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Options</title>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
