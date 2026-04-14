"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function AutocompleteAutoHighlight() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root
      items={EMOJIS}
      open={open}
      onOpenChange={setOpen}
      autoHighlight
    >
      <div className="d-f fd-c g-2">
        <label
          htmlFor="auto-highlight-input"
          className="c-slate-10 fs-sm fw-600"
        >
          Add emoji
        </label>
        <Autocomplete.Input
          id="auto-highlight-input"
          placeholder="e.g.Rainbow"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-auto max-w-72 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="d-g gtc-6 g-1 py-1 ow-0">
                  {(item: Emoji) => (
                    <Autocomplete.Item
                      key={item.name}
                      value={item.name}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c jc-c py-2 px-3 fs-xl us-none c-d c-p br-lg mx-1 ${
                            state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                          }`}
                        >
                          {item.emoji}
                        </div>
                      )}
                    />
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4">No emoji found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Emoji {
  name: string;
  emoji: string;
}

const EMOJIS: Emoji[] = [
  { name: "Party", emoji: "🥳" },
  { name: "Fire", emoji: "🔥" },
  { name: "Heart", emoji: "❤️" },
  { name: "Star", emoji: "⭐" },
  { name: "Rocket", emoji: "🚀" },
  { name: "Tada", emoji: "🎉" },
  { name: "Hundred", emoji: "💯" },
  { name: "Sparkles", emoji: "✨" },
  { name: "Rainbow", emoji: "🌈" },
  { name: "Skull", emoji: "💀" },
  { name: "Joy", emoji: "😂" },
  { name: "Thinking", emoji: "🤔" },
];
