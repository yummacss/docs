"use client";

import { useEffect, useState } from "react";

export default function NavbarCenterAlignedLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="bbw-1 bc-silver-4 bg-white px-6 py-4"
    >
      <div className="ai-c d-f jc-sb max-w-xl mx-auto">
        <a href="/" className="fs-xl fw-600 c-black td-none">
          Brand
        </a>

        {/* Desktop Center Menu */}
        <ul className="ai-c d-none md:d-f g-6 ls-none p-0 m-0">
          <li>
            <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
              Product
            </a>
          </li>
          <li>
            <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
              Resources
            </a>
          </li>
          <li>
            <a href="/" className="fs-sm h:c-black c-slate-7 td-none">
              Pricing
            </a>
          </li>
        </ul>

        {/* Desktop Right Button */}
        <div className="ai-c d-none g-3 md:d-f">
          <a
            href="/"
            className="bw-1 bc-silver-4 fs-sm h:bg-silver-1 px-4 py-2 br-0 c-black td-none f:oc-silver-1 f:os-s f:ow-2"
          >
            Sign in
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu-center"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          onClick={toggleMenu}
          className="d-f ai-c jc-c c-p br-0 px-2 py-2 bw-1 bc-silver-4 bg-white h:bg-silver-2 d-f md:d-none f:oc-silver-1 f:os-s f:ow-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 c-black"
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <rect width="256" height="256" fill="none" />
            {isOpen ? (
              <path
                d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                fill="currentColor"
              />
            ) : (
              <>
                <line
                  x1="40"
                  y1="128"
                  x2="216"
                  y2="128"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <line
                  x1="40"
                  y1="64"
                  x2="216"
                  y2="64"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <line
                  x1="40"
                  y1="192"
                  x2="216"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu-center"
        className={`md:d-none mt-4 ${isOpen ? "d-b" : "d-none"}`}
      >
        <ul className="d-f fd-c g-4 ls-none p-0 m-0">
          <li>
            <a href="/" className="d-b fs-sm h:c-black c-slate-7 td-none py-2">
              Product
            </a>
          </li>
          <li>
            <a href="/" className="d-b fs-sm h:c-black c-slate-7 td-none py-2">
              Resources
            </a>
          </li>
          <li>
            <a href="/" className="d-b fs-sm h:c-black c-slate-7 td-none py-2">
              Pricing
            </a>
          </li>
          <li className="btw-1 bc-silver-4 pt-4">
            <a href="/" className="d-b fs-sm h:c-black c-slate-7 td-none py-2">
              Sign in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
