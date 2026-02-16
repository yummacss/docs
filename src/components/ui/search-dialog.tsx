"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowDownIcon,
  ArrowElbowDownLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  StackSimpleIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBorderColor } from "@/utils/colors";
import {
  CATEGORY_LABELS,
  filterSearchResults,
  groupByCategory,
  type SearchItem,
} from "@/utils/search-data";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter and group results
  const filteredResults = useMemo(() => filterSearchResults(query), [query]);
  const groupedResults = useMemo(
    () => groupByCategory(filteredResults),
    [filteredResults],
  );
  const flatResults = useMemo(() => filteredResults, [filteredResults]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setCopiedColor(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, flatResults.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter": {
          e.preventDefault();
          const selected = flatResults[selectedIndex];
          if (selected) {
            if (selected.category === "colors" && selected.color) {
              navigator.clipboard.writeText(selected.color.toUpperCase());
              setCopiedColor(selected.title);
              setTimeout(() => setCopiedColor(null), 1500);
            } else {
              router.push(selected.path);
              onClose();
            }
          }
          break;
        }
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, selectedIndex, router, onClose],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && flatResults.length > 0) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      const selected = items[selectedIndex] as HTMLElement | undefined;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, flatResults.length]);

  // Handle item click
  const handleItemClick = (item: SearchItem, index: number) => {
    if (item.category === "colors" && item.color) {
      navigator.clipboard.writeText(item.color.toUpperCase());
      setCopiedColor(item.title);
      setTimeout(() => setCopiedColor(null), 1500);
    } else {
      router.push(item.path);
      onClose();
    }
    setSelectedIndex(index);
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    if (category === "docs") {
      return <ArrowRightIcon size={14} className="c-white/50" />;
    }
    return <StackSimpleIcon size={14} className="c-white/50" />;
  };

  // Track global index for keyboard nav
  let globalIndex = -1;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              }
              className="p-f zi-50 t-0 l-0 r-0 b-0 bg-black/60 bf-b-xs f-g-90"
            />
            <div className="p-f zi-50 t-0 l-0 r-0 b-0 d-f ai-c jc-c pe-n">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="w-full o-h bw-1 bc-white/10"
                style={{
                  backgroundColor: "#151724",
                  maxHeight: "70vh",
                  maxWidth: "512px",
                }}
                onKeyDown={handleKeyDown}
              >
                {/* Search Input */}
                <div
                  className="d-f ai-c g-3 px-4 py-3 bbw-1 bc-white/10"
                >
                  <MagnifyingGlassIcon size={18} className="c-white/50" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    className="f-1 bg-transparent b-0 fs-md c-white"
                    style={{ outline: "none" }}
                  />
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="o-y-auto px-2 py-2"
                  style={{ maxHeight: "calc(70vh - 120px)" }}
                >
                  {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                    const items = groupedResults[category];
                    if (!items || items.length === 0) return null;

                    return (
                      <div key={category} className="mb-2">
                        <div className="px-2 py-1 fs-xs c-white tt-u ls-3">
                          {label}
                        </div>
                        {items.map((item) => {
                          globalIndex++;
                          const currentIndex = globalIndex;
                          const isSelected = selectedIndex === currentIndex;
                          const isColorCopied = copiedColor === item.title;

                          return (
                            <Button
                              key={`${item.path}-${item.title}`}
                              data-search-item
                              type="button"
                              onClick={() =>
                                handleItemClick(item, currentIndex)
                              }
                              onMouseEnter={() =>
                                setSelectedIndex(currentIndex)
                              }
                              className="d-f ai-c g-3 w-full px-3 py-2 ta-l b-0 c-p"
                              style={{
                                backgroundColor: isSelected
                                  ? "#ffffff1a"
                                  : "transparent",
                              }}
                            >
                              {/* Icon or Color Swatch */}
                              {item.category === "colors" && item.color ? (
                                <div
                                  className="d-4 br-1 fs-0"
                                  style={{
                                    backgroundColor: item.color,
                                    border: getBorderColor(item.color),
                                  }}
                                />
                              ) : (
                                getCategoryIcon(item.category)
                              )}

                              {/* Title and Description */}
                              <div className="f-1 min-w-0">
                                <div className="c-white fs-md tw-n to-e o-h ws-nw">
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="c-white/50 fs-xs tw-n to-e o-h ws-nw">
                                    {item.category === "colors" && isColorCopied
                                      ? "Copied!"
                                      : item.description}
                                  </div>
                                )}
                              </div>

                              {/* Action indicator */}
                              {isSelected && (
                                <ArrowElbowDownLeftIcon
                                  size={14}
                                  className="c-white/50 fs-0"
                                />
                              )}
                            </Button>
                          );
                        })}
                      </div>
                    );
                  })}

                  {flatResults.length === 0 && (
                    <div className="px-4 py-8 ta-c c-white/50 fs-md">
                      No results found for "{query}"
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="d-f ai-c jc-sb px-4 py-2 fs-xs c-white/40 btw-1 bc-white/10"
                >
                  <div className="d-f ai-c g-4">
                    <span className="d-f ai-c g-1">
                      <kbd
                        className="p-1 bw-1 d-f ai-c br-1 bw-1 bc-white/10"
                        style={{
                          backgroundColor: "#151724",
                        }}
                      >
                        <ArrowUpIcon weight="bold" size={16} />
                      </kbd>
                      <kbd
                        className="p-1 bw-1 d-f ai-c br-1 bw-1 bc-white/10"
                        style={{
                          backgroundColor: "#151724",
                        }}
                      >
                        <ArrowDownIcon weight="bold" size={16} />
                      </kbd>
                      <span className="ml-1 fs-md">to navigate</span>
                    </span>
                    <span className="d-f ai-c g-1">
                      <kbd
                        className="p-1 bw-1 d-f ai-c br-1 bw-1 bc-white/10"
                        style={{
                          backgroundColor: "#151724",
                        }}
                      >
                        <ArrowElbowDownLeftIcon weight="bold" size={16} />
                      </kbd>
                      <span className="ml-1 fs-md">to select</span>
                    </span>
                  </div>
                  <span className="d-f ai-c g-1">
                    <kbd
                      className="p-1 bw-1 d-f ai-c br-1 bw-1 bc-white/10"
                      style={{
                        backgroundColor: "#151724",
                      }}
                    >
                      <XIcon weight="bold" size={16} />
                    </kbd>
                    <span className="ml-1 fs-md">to close</span>
                  </span>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
