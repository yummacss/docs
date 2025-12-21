import { useEffect, useRef, useState } from "react";

export default function DropdownIcons() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const items = [
    {
      id: "new-file",
      label: "New file",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-silver-10"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <path
            d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <polyline
            points="152 32 152 88 208 88"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="104"
            y1="152"
            x2="152"
            y2="152"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="128"
            y1="128"
            x2="128"
            y2="176"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
    {
      id: "copy-link",
      label: "Copy link",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-silver-10"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="168 168 216 168 216 40 88 40 88 88"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <rect
            x="40"
            y="88"
            width="128"
            height="128"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
    {
      id: "edit-file",
      label: "Edit file",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 tc-silver-10"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <path
            d="M92.69,216H48a8,8,0,0,1-8-8V163.31a8,8,0,0,1,2.34-5.65L165.66,34.34a8,8,0,0,1,11.31,0L221.66,79a8,8,0,0,1,0,11.31L98.34,213.66A8,8,0,0,1,92.69,216Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="136"
            y1="64"
            x2="192"
            y2="120"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
    {
      id: "delete-file",
      label: "Delete file",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="216"
            y1="56"
            x2="40"
            y2="56"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="104"
            y1="104"
            x2="104"
            y2="168"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="152"
            y1="104"
            x2="152"
            y2="168"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
  ];

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
        console.log(`Selected: ${items[activeIndex].label}`);
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
        id="dropdown-icons-button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="dropdown-icons-menu"
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
          id="dropdown-icons-menu"
          role="menu"
          aria-labelledby="dropdown-icons-button"
          onKeyDown={handleKeyDown}
          className="p-a mt-1 p-1 bg-white b-1 bc-silver-4 rad-0 bs-3 min-w-44 z-10"
        >
          {items.map((item, index) => (
            <div key={item.id}>
              {index === 3 && <hr className="my-1 b-0 bt-1 bc-silver-4" />}
              <button
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={`d-f ai-c g-2 w-full ta-l px-3 py-2 rad-0 fs-sm b-0 c-p tr-c ${
                  index === 3 ? "tc-red h:bg-red-1" : "tc-slate-8 h:bg-silver-1"
                } ${activeIndex === index ? (index === 3 ? "bg-red-1" : "bg-silver-1") : "bg-transparent"}`}
                onClick={() => {
                  console.log(`Selected: ${item.label}`);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
