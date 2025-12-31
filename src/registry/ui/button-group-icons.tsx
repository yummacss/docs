export default function ButtonGroupIcons() {
  return (
    <div className="d-f fd-c g-2">
      <p className="fs-xs c-slate-5 fw-600">Alignment</p>
      <div className="d-f">
        <button
          type="button"
          className="d-f ai-c jc-c px-3 py-2 rad-l-0 fs-sm fw-600 bg-white c-slate bw-1 bc-silver-4 h:bg-silver-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M232,152v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Zm40,88h96a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H80A16,16,0,0,0,64,64v40A16,16,0,0,0,80,120Z" />
          </svg>
        </button>
        <button
          type="button"
          className="d-f ai-c jc-c px-3 py-2 fs-sm fw-600 bg-white c-slate bw-1 bl-0 bc-silver-4 h:bg-silver-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M224,152v40a16,16,0,0,1-16,16H136v16a8,8,0,0,1-16,0V208H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16h72V120H72a16,16,0,0,1-16-16V64A16,16,0,0,1,72,48h48V32a8,8,0,0,1,16,0V48h48a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H136v16h72A16,16,0,0,1,224,152Z" />
          </svg>
        </button>
        <button
          type="button"
          className="d-f ai-c jc-c px-3 py-2 rad-r-0 fs-sm fw-600 bg-white c-slate bw-1 bl-0 bc-silver-4 h:bg-silver-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 256 256"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm-48,8H80A16,16,0,0,0,64,64v40a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16V64A16,16,0,0,0,176,48Zm0,88H40a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V152A16,16,0,0,0,176,136Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
