"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Separator } from "@base-ui/react/separator";
import { Hashtag, Lock, Volume } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function AutocompleteGrouped() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root
      items={CHANNEL_GROUPS}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="d-f fd-c g-2">
        <label htmlFor="grouped-input" className="c-slate-10 fs-sm fw-600">
          Search channels
        </label>
        <Autocomplete.Input
          id="grouped-input"
          placeholder="e.g. general"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(group: ChannelGroup, groupIndex) => (
                    <Autocomplete.Group key={group.value}>
                      {group.items.map((item) => (
                        <Autocomplete.Item
                          key={item}
                          value={item}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1"
                                  : "h:bg-silver-1"
                              }`}
                            >
                              {group.value === "Text Channels" && (
                                <Hashtag className="w-4 h-4 c-slate-6" />
                              )}
                              {group.value === "Voice Channels" && (
                                <Volume className="w-4 h-4 c-slate-6" />
                              )}
                              {group.value === "Private" && (
                                <Lock className="w-4 h-4 c-slate-6" />
                              )}
                              <span className="fw-600">{item}</span>
                            </div>
                          )}
                        />
                      ))}
                      {groupIndex < CHANNEL_GROUPS.length - 1 && (
                        <Separator className="my-2 w-full h-px bg-silver-2" />
                      )}
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4">No channels found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface ChannelGroup {
  value: string;
  items: string[];
}

const CHANNEL_GROUPS: ChannelGroup[] = [
  {
    value: "Text Channels",
    items: ["general", "announcements", "memes", "music", "gaming"],
  },
  {
    value: "Voice Channels",
    items: ["Main Stage", "Gaming Lounge", "Study Room", "Music Jam"],
  },
  {
    value: "Private",
    items: ["mod-chat", "admin-only"],
  },
];
