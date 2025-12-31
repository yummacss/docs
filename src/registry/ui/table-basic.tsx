export default function TableBasic() {
  return (
    <div className="o-x-auto w-full bw-1 bb-0 bc-silver-2 br-0 bg-white">
      <table className="w-full ta-l bc-c" aria-label="User directory">
        <thead>
          <tr>
            <th
              scope="col"
              className="bbw-1 bc-silver-4 c-silver-10 fs-sm fw-500 px-4 py-3"
            >
              Name
            </th>
            <th
              scope="col"
              className="bbw-1 bc-silver-4 c-silver-10 fs-sm fw-500 px-4 py-3"
            >
              Status
            </th>
            <th
              scope="col"
              className="bbw-1 bc-silver-4 c-silver-10 fs-sm fw-500 px-4 py-3"
            >
              Role
            </th>
            <th
              scope="col"
              className="bbw-1 bc-silver-4 c-silver-10 fs-sm fw-500 px-4 py-3"
            >
              Position
            </th>
            <th
              scope="col"
              className="bbw-1 bc-silver-4 c-silver-10 fs-sm fw-500 px-4 py-3 ta-r"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              scope="row"
              className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black fw-400"
            >
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/phoenix-baker.jpg"
                  alt="Phoenix Baker"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 c-black">Phoenix Baker</span>
                  <span className="fs-xs c-silver-10">@phoenix</span>
                </div>
              </div>
            </th>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black">
              <span className="d-if ai-c px-2 py- br-0 fs-xs fw-500 bg-green-1/50 c-green bw-1 bc-green-2">
                Online
              </span>
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Engineering Manager
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Admin
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black ta-r">
              <a
                href="/"
                className="c-slate fw-500 td-none h:td-u d-if ai-c g-1"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <polygon
                    points="128 160 96 160 96 128 192 32 224 64 128 160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="168"
                    y1="56"
                    x2="200"
                    y2="88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M216,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h80"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                <span>Edit</span>
              </a>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black fw-400"
            >
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/kaitlin-hale.jpg"
                  alt="Kaitlin Hale"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 c-black">Kaitlin Hale</span>
                  <span className="fs-xs c-silver-10">@kaitlin</span>
                </div>
              </div>
            </th>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black">
              <span className="d-if ai-c px-2 py- br-0 fs-xs fw-500 bg-red-1/50 c-red bw-1 bc-red-2">
                Offline
              </span>
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Product Manager
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Member
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black ta-r">
              <a
                href="/"
                className="c-slate fw-500 td-none h:td-u d-if ai-c g-1"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <polygon
                    points="128 160 96 160 96 128 192 32 224 64 128 160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="168"
                    y1="56"
                    x2="200"
                    y2="88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M216,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h80"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                <span>Edit</span>
              </a>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black fw-400"
            >
              <div className="d-f ai-c g-3">
                <img
                  src="/img/people/kelly-williams.jpg"
                  alt="Kelly Williams"
                  className="w-10 h-10 rad-full of-c"
                />
                <div className="d-f fd-c">
                  <span className="fw-600 c-black">Kelly Williams</span>
                  <span className="fs-xs c-silver-10">@kelly</span>
                </div>
              </div>
            </th>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black">
              <span className="d-if ai-c px-2 py- br-0 fs-xs fw-500 bg-green-1/50 c-green bw-1 bc-green-2">
                Online
              </span>
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Frontend Developer
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-silver-10">
              Member
            </td>
            <td className="bbw-1 bc-silver-2 px-4 py-3 fs-sm c-black ta-r">
              <a
                href="/"
                className="c-slate fw-500 td-none h:td-u d-if ai-c g-1"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <rect width="256" height="256" fill="none" />
                  <polygon
                    points="128 160 96 160 96 128 192 32 224 64 128 160"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="168"
                    y1="56"
                    x2="200"
                    y2="88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M216,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h80"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                <span>Edit</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
