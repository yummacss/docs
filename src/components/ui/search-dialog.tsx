"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import { Input } from "@base-ui/react/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Scroller from "@/components/ui/scroller";
import {
  LongArrowDownLeftSolid,
  NavArrowDown,
  NavArrowUp,
  Search,
} from "@/icons";
import { getBorderColor } from "@/utils/colors";
import {
  CATEGORY_LABELS,
  filterSearchResults,
  groupByCategory,
  loadSearchIndex,
  type SearchIndex,
  type SearchItem,
  SUGGESTIONS,
} from "@/utils/search-data";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const KBD = "d:if ai:c jc:c h:5 px:1 bc:border bw:1 c:ink/60 fs:xs";

/** The title with the typed text in the accent. */
function Match({ text, query }: { text: string; query: string }) {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="c:accent">{text.slice(at, at + query.length)}</span>
      {text.slice(at + query.length)}
    </>
  );
}

/** The highlighted result, larger: a component's screenshot, a color's swatch. */
function Preview({
  item,
  copied,
  onCopy,
}: {
  item?: SearchItem;
  copied: boolean;
  onCopy: (item: SearchItem) => void;
}) {
  if (!item) return null;
  if (item.category === "colors" && item.color) {
    return (
      <div className="d:f fd:c g:4 p:5">
        <div
          className="h:40"
          style={{
            backgroundColor: item.color,
            border: getBorderColor(item.color),
          }}
        />
        <div className="d:f fd:c g:1">
          <span className="c:ink ff:display fs:xl">{item.title}</span>
          <span className="c:ink/70">{item.description}</span>
        </div>
        <Button
          type="button"
          onClick={() => onCopy(item)}
          className="d:if ai:c h:8 px:3 w:fc bc:border bg:surface h:bg:surface-8 a:bg:surface-7 c:ink bw:1 fs:sm fv:oc:ink fv:ow:2"
        >
          {copied ? "Copied" : "Copy hex"}
        </Button>
      </div>
    );
  }
  return (
    <div className="d:f fd:c g:3 p:5">
      <span className="c:ink/50 fs:xs ls:2 tt:u">
        {CATEGORY_LABELS[item.category]}
      </span>
      <span className="c:ink ff:display fs:xxl">{item.title}</span>
      {item.description && (
        <span className="c:ink/70 fs:sm lh:5">{item.description}</span>
      )}
      {item.preview && (
        // biome-ignore lint/performance/noImgElement: a static screenshot at its own size
        <img
          src={item.preview}
          alt=""
          className="mt:2 w:100% h:auto bc:border bw:1 bg:silver-1"
        />
      )}
      <span className="mt:2 c:ink/40 fs:xs">{item.path}</span>
    </div>
  );
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // the navbar starts the fetch on hover or focus; opening loads it otherwise, and retries a failure
  useEffect(() => {
    if (index || !open) return;
    let live = true;
    loadSearchIndex().then(
      (loaded) => live && setIndex(loaded),
      () => {},
    );
    return () => {
      live = false;
    };
  }, [index, open]);

  const filteredResults = useMemo(
    () => filterSearchResults(query, index),
    [query, index],
  );
  const groupedResults = useMemo(
    () => groupByCategory(filteredResults),
    [filteredResults],
  );
  const flatResults = useMemo(() => {
    const ordered: SearchItem[] = [];
    for (const category of Object.keys(CATEGORY_LABELS)) {
      const items = groupedResults[category];
      if (items) {
        ordered.push(...items);
      }
    }
    return ordered;
  }, [groupedResults]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setCopiedColor(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const copy = useCallback((item: SearchItem) => {
    if (!item.color) return;
    navigator.clipboard.writeText(item.color.toUpperCase());
    setCopiedColor(item.title);
    setTimeout(() => setCopiedColor(null), 1500);
  }, []);

  const choose = useCallback(
    (item: SearchItem) => {
      if (item.category === "colors") {
        copy(item);
      } else {
        router.push(item.path);
        onClose();
      }
    },
    [copy, router, onClose],
  );

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
          if (selected) choose(selected);
          break;
        }
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, selectedIndex, choose, onClose],
  );

  useEffect(() => {
    if (listRef.current && flatResults.length > 0) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      const selected = items[selectedIndex] as HTMLElement | undefined;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, flatResults.length]);

  const empty = query.trim() === "";
  let globalIndex = -1;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="tp:o tdu:150 ttf:eo opening:o:0 closing:o:0 @prm:tp:none p:f zi:10 t:0 l:0 r:0 b:0 bg:black/60 bf-b:sm fgr:90" />
        <div className="d:f p:f zi:10 t:0 l:0 r:0 b:0 ai:fs jc:c pe:none @md:pt:24">
          <Dialog.Popup
            data-chrome
            aria-label="Search"
            className="tp:o tdu:150 ttf:eo opening:o:0 closing:o:0 @prm:tp:none d:f fd:c o:h w:100% h:dvh bg:page pe:auto @md:w:224 @md:max-w:calc(100vw-4rem) @md:h:auto @md:max-h:calc(70vh) @md:bc:border @md:bw:1"
            onKeyDown={handleKeyDown}
          >
            <div className="d:f fs:0 ai:c g:3 px:4 h:14 bc:border bbw:1">
              <Search className="fs:0 w:5 h:5 c:ink/60" />
              <Input
                ref={inputRef}
                type="text"
                aria-label="Search the docs"
                placeholder="Search classes, components, colors"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                autoFocus
                className="f:1 min-w:0 bg:transparent c:ink os:none fs:md"
              />
              <kbd className={`${KBD} d:none @md:d:if`}>Esc</kbd>
              <Dialog.Close className="c:accent fs:md bg:transparent b:0 fv:oc:ink fv:ow:2 @md:d:none">
                Cancel
              </Dialog.Close>
            </div>

            <div className="d:f f:1 min-h:0">
              <Scroller
                viewportRef={listRef}
                viewportClassName="px:2 py:2"
                className="f:1 min-h:0 min-w:0 @md:max-h:calc(70vh-6.5rem)"
              >
                {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                  const items = groupedResults[category];
                  if (!items || items.length === 0) return null;

                  if (category === "colors") {
                    return (
                      <div key={category} className="mb:2">
                        <div className="px:3 py:1 c:ink/50 fs:xs ls:2 tt:u">
                          {label}
                        </div>
                        <div className="d:g g:1 px:1 gtc:6 @sm:gtc:8">
                          {items.map((item) => {
                            globalIndex++;
                            const currentIndex = globalIndex;
                            const isSelected = selectedIndex === currentIndex;
                            return (
                              <Button
                                key={item.title}
                                data-search-item
                                type="button"
                                aria-label={`${item.title}, ${item.description}`}
                                onClick={() => {
                                  setSelectedIndex(currentIndex);
                                  copy(item);
                                }}
                                onMouseEnter={() =>
                                  setSelectedIndex(currentIndex)
                                }
                                className={`d:f fd:c g:1 p:1 bw:1 bg:transparent c:p ${isSelected ? "bc:ink/60" : "bc:transparent"}`}
                              >
                                <span
                                  className="d:b h:8"
                                  style={{
                                    backgroundColor: item.color,
                                    border: getBorderColor(item.color ?? ""),
                                  }}
                                />
                                <span className="c:ink/60 fs:xs">
                                  {copiedColor === item.title
                                    ? "Copied"
                                    : item.title.replace(/^.*\s(?=\d+$)/, "")}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={category} className="mb:2">
                      <div className="px:3 py:1 c:ink/50 fs:xs ls:2 tt:u">
                        {label}
                      </div>
                      {items.map((item) => {
                        globalIndex++;
                        const currentIndex = globalIndex;
                        const isSelected = selectedIndex === currentIndex;

                        return (
                          <Button
                            key={`${item.path}-${item.title}`}
                            data-search-item
                            type="button"
                            onClick={() => {
                              setSelectedIndex(currentIndex);
                              choose(item);
                            }}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            className={`d:f b:0 ai:c g:3 w:100% px:3 py:2 ta:l c:p ${
                              isSelected ? "bg:surface-8" : "bg:transparent"
                            }`}
                          >
                            <span className="d:f f:1 min-w:0 ai:b g:3">
                              <span className="fs:0 c:ink fs:md ws:nw">
                                <Match text={item.title} query={query} />
                              </span>
                              {item.description && (
                                <span className="o:h c:ink/50 fs:sm to:e ws:nw">
                                  {item.description}
                                </span>
                              )}
                            </span>
                            {isSelected && (
                              <LongArrowDownLeftSolid className="fs:0 w:4 h:4 c:ink/50" />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  );
                })}

                {empty && (
                  <div className="px:3 pt:3 pb:2">
                    <div className="pb:3 c:ink/50 fs:xs ls:2 tt:u">Try</div>
                    <div className="d:f fw:w g:2">
                      {SUGGESTIONS.map((suggestion) => (
                        <Button
                          key={suggestion}
                          type="button"
                          onClick={() => {
                            setQuery(suggestion);
                            setSelectedIndex(0);
                            inputRef.current?.focus();
                          }}
                          className="px:2 py:1 bc:border bg:transparent h:bg:surface-8 c:ink/80 bw:1 fs:sm fv:oc:ink fv:ow:2"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {flatResults.length === 0 && !empty && (
                  <div className="px:4 py:8 c:ink/50 ta:c fs:md">
                    No results for "{query}"
                  </div>
                )}
              </Scroller>

              <div className="d:none w:40% fs:0 bc:border blw:1 oy:auto @md:d:b">
                <Preview
                  item={flatResults[selectedIndex]}
                  copied={copiedColor === flatResults[selectedIndex]?.title}
                  onCopy={copy}
                />
              </div>
            </div>

            {/* keys to press, so only where a keyboard is likely: the navbar's Ctrl K hint shows from the same width */}
            <div className="d:none fs:0 ai:c g:4 px:4 h:10 bc:border c:ink/50 btw:1 fs:xs @lg:d:f">
              <span className="d:f ai:c g:1">
                <kbd className={KBD}>
                  <NavArrowUp className="w:3 h:3" />
                </kbd>
                <kbd className={KBD}>
                  <NavArrowDown className="w:3 h:3" />
                </kbd>
                <span className="ml:1">to move</span>
              </span>
              <span className="d:f ai:c g:1">
                <kbd className={KBD}>
                  <LongArrowDownLeftSolid className="w:3 h:3" />
                </kbd>
                <span className="ml:1">to open, or copy a color</span>
              </span>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
