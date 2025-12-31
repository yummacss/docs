export default function InputIcon() {
  return (
    <div className="d-f fd-c g-2">
      <div className="p-r w-full">
        <input
          id="search"
          type="text"
          placeholder="Search..."
          className="bw-1 bc-silver-4 c-black pl-9 pr-3 py-2 br-0 fs-md f:oc-silver-1 f:os-s f:ow-2 w-full"
          aria-label="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="p-a l-3 t-0 bo-0 m-auto fs-lg c-silver-12 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </div>
    </div>
  );
}
