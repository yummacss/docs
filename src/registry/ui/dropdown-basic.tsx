import { useEffect, useRef, useState } from "react";

export default function DropdownBasic() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const items = ["New file", "Copy link", "Edit file", "Delete file"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setActiveIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(items.length - 1);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        console.log(`Selected: ${items[activeIndex]}`);
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "Escape":
      case "Tab":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  useEffect(() => {
    if (isOpen && activeIndex !== -1) {
      const menuItems =
        menuRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]',
        );
      menuItems?.[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="d-ib p-r">
      <button
        ref={buttonRef}
        type="button"
        id="dropdown-button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        className="d-f ai-c g-2 px-4 py-2 rad-0 fs-sm fw-600 bg-white tc-slate-8 b-1 bc-silver-4 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
      >
        <span>Actions</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="208 96 128 176 48 96"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id="dropdown-menu"
          role="menu"
          aria-labelledby="dropdown-button"
          onKeyDown={handleKeyDown}
          className="p-a mt-1 p-1 bg-white b-1 bc-silver-4 rad-0 bs-3 min-w-40 z-10"
        >
          {items.map((item, index) => (
            <div key={item}>
              {index === 3 && <hr className="my-1 b-0 bt-1 bc-silver-4" />}
              <button
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={`d-b w-full ta-l px-3 py-2 rad-0 fs-sm b-0 c-p tr-c ${index === 3 ? "tc-red h:bg-red-1" : "tc-slate-8 h:bg-silver-1"
                  } ${activeIndex === index ? (index === 3 ? "bg-red-1" : "bg-silver-1") : "bg-transparent"}`}
                onClick={() => {
                  console.log(`Selected: ${item}`);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
