"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useEffect, useState } from "react";

export default function AutocompleteLoading() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setLoading(true);
      setHasResults(true);
      setOpen(true);
    } else {
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setHasResults(MUSIC.length > 0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Autocomplete.Root items={MUSIC} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="loading-input" className="c-slate-10 fs-sm fw-500">
          Search music
        </label>
        <Autocomplete.Input
          id="loading-input"
          placeholder="Songs, albums, artists..."
          onChange={handleInputChange}
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
                className="o-h w-80 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                {loading && hasResults ? (
                  <div className="d-f fd-c g-3 py-3 px-4">
                    <div className="d-f ai-c g-3">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-8 h-8 bg-silver-2 br-md"
                      />
                      <div className="d-f fd-c g-1">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-3 w-24 bg-silver-2 br-xs"
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-2 w-16 bg-silver-1 br-xs"
                        />
                      </div>
                    </div>
                    <div className="d-f ai-c g-3">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-8 h-8 bg-silver-2 br-pill"
                      />
                      <div className="d-f fd-c g-1">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-3 w-20 bg-silver-2 br-xs"
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-2 w-14 bg-silver-1 br-xs"
                        />
                      </div>
                    </div>
                    <div className="d-f ai-c g-3">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-8 h-8 bg-silver-2 br-pill"
                      />
                      <div className="d-f fd-c g-1">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-3 w-28 bg-silver-2 br-xs"
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-2 w-12 bg-silver-1 br-xs"
                        />
                      </div>
                    </div>
                  </div>
                ) : !loading && hasResults ? (
                  <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                    {(item: MusicItem) => (
                      <Autocomplete.Item
                        key={item.name}
                        value={item.name}
                        render={(props, state) => (
                          <div
                            {...props}
                            className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 ${
                                item.type === "Artist" ||
                                item.type === "Profile"
                                  ? "br-pill"
                                  : "br-md"
                              } ${item.color}`}
                            />
                            <div className="d-f fd-c">
                              <span className="fw-500">{item.name}</span>
                              {item.type !== "Profile" && item.artist && (
                                <span className="fs-xs c-slate-6">
                                  {item.type} · {item.artist}
                                </span>
                              )}
                              {item.type !== "Profile" && !item.artist && (
                                <span className="fs-xs c-slate-6">
                                  {item.type}
                                </span>
                              )}
                              {item.type === "Profile" && (
                                <span className="fs-xs c-slate-6">Profile</span>
                              )}
                            </div>
                          </div>
                        )}
                      />
                    )}
                  </Autocomplete.List>
                ) : !loading && !hasResults ? (
                  <Autocomplete.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No results found.
                    </div>
                  </Autocomplete.Empty>
                ) : null}
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

const MUSIC: MusicItem[] = [
  {
    name: "piano songs (part 2)",
    type: "Album",
    artist: "erica's garden",
    color: "bg-violet-3",
  },
  {
    name: "collarbone",
    type: "Single",
    artist: "The Glass Dogs",
    color: "bg-mint-3",
  },
  {
    name: "scaryfragile",
    type: "Profile",
    artist: "Rick Valley",
    color: "bg-silver-2",
  },
  {
    name: "Indie Rock",
    type: "Playlist",
    artist: "",
    color: "bg-green-3",
  },
  {
    name: "Grunge",
    type: "Playlist",
    artist: "",
    color: "bg-red-3",
  },
  {
    name: "piano songs (part 1)",
    type: "Album",
    artist: "eric's garden",
    color: "bg-violet-3",
  },
  {
    name: "Pangeia/Terraform",
    type: "Compilation",
    artist: "Vianne",
    color: "bg-orange-3",
  },
];
