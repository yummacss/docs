"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <span className="c-indigo fw-500">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function AutocompleteHighlight() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <Autocomplete.Root items={music} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="highlight-input" className="c-slate-10 fs-sm fw-500">
          Search music
        </label>
        <Autocomplete.Input
          id="highlight-input"
          placeholder="Songs, albums, artists…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <AnimatePresence>
        {open && (
          <Autocomplete.Portal keepMounted>
            <Autocomplete.Positioner className="ow-0" sideOffset={4}>
              <Autocomplete.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-72 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(item: MusicItem) => (
                    <Autocomplete.Item
                      key={item.name}
                      value={item.name}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                            state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 ${item.type === "Artist" || item.type === "Profile" ? "br-pill" : "br-md"} ${item.color}`}
                          />
                          <div className="d-f fd-c min-w-0">
                            <span className="fw-500">
                              <HighlightMatch text={item.name} query={query} />
                            </span>
                            <span className="fs-xs c-slate-6">
                              {item.type}
                              {item.artist ? ` · ${item.artist}` : ""}
                            </span>
                          </div>
                        </div>
                      )}
                    />
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4 us-none">No results found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface MusicItem {
  name: string;
  type: string;
  artist: string;
  color: string;
}

const music: MusicItem[] = [
  { name: "piano songs (part 2)", type: "Album", artist: "erica's garden", color: "bg-violet-3" },
  { name: "collarbone", type: "Single", artist: "The Glass Dogs", color: "bg-mint-3" },
  { name: "scaryfragile", type: "Profile", artist: "", color: "bg-silver-2" },
  { name: "Indie Rock", type: "Playlist", artist: "", color: "bg-green-3" },
  { name: "Grunge", type: "Playlist", artist: "", color: "bg-red-3" },
  { name: "piano songs (part 1)", type: "Album", artist: "erica's garden", color: "bg-violet-3" },
  { name: "Pangeia/Terraform", type: "Compilation", artist: "Vianne", color: "bg-orange-3" },
];
