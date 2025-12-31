"use client";

import { useState } from "react";

export default function PaginationBasic() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <nav aria-label="Pagination" className="d-f ai-c g-1">
      <ul className="d-f ai-c g-1 ls-none p-0 m-0">
        <li>
          <button
            type="button"
            onClick={(e) => handlePageChange(currentPage - 1, e)}
            aria-label="Go to previous page"
            className={`d-f ai-c jc-c d-9 br-pill fs-sm fw-500 c-slate-8 h:bg-silver-1 bw-0 c-p ${
              currentPage === 1 ? "o-05 pe-none" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <rect width="256" height="256" fill="none" />
              <polyline
                points="160 208 80 128 160 48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </button>
        </li>
        {[1, 2, 3, 4, 5].map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={(e) => handlePageChange(page, e)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`d-f ai-c jc-c d-9 br-pill fs-sm fw-500 bw-0 c-p ${
                currentPage === page
                  ? "bg-slate-8 c-white"
                  : "c-slate-8 h:bg-silver-1 bg-transparent"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={(e) => handlePageChange(currentPage + 1, e)}
            aria-label="Go to next page"
            className={`d-f ai-c jc-c d-9 br-pill fs-sm fw-500 c-slate-8 h:bg-silver-1 bw-0 c-p ${
              currentPage === totalPages ? "o-05 pe-none" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <rect width="256" height="256" fill="none" />
              <polyline
                points="96 48 176 128 96 208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
