"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAutocomplete() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={languages} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="autocomplete-input" className="c-slate-10 fs-sm fw-600">
          Programming language
        </label>
        <Autocomplete.Input
          id="autocomplete-input"
          placeholder="e.g. TypeScript"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-2 fs-sm fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-64 py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-2 bs-o-lg"
              >
                <Autocomplete.Empty className="py-4 px-4 c-slate-6 fs-sm">
                  No languages found.
                </Autocomplete.Empty>
                <Autocomplete.List
                  className="o-y-auto ow-0"
                  style={{ maxHeight: "18rem" }}
                >
                  {(language: Language) => (
                    <Autocomplete.Item
                      key={language.id}
                      value={language}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c py-2 px-3 fs-sm us-none c-d c-p br-1 mx-1 c-slate-10 ${
                            state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                          }`}
                        >
                          {language.value}
                        </div>
                      )}
                    />
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface Language {
  id: string;
  value: string;
}

const languages: Language[] = [
  { id: "ts", value: "TypeScript" },
  { id: "js", value: "JavaScript" },
  { id: "py", value: "Python" },
  { id: "rs", value: "Rust" },
  { id: "go", value: "Go" },
  { id: "java", value: "Java" },
  { id: "kt", value: "Kotlin" },
  { id: "swift", value: "Swift" },
  { id: "cs", value: "C#" },
  { id: "cpp", value: "C++" },
  { id: "c", value: "C" },
  { id: "rb", value: "Ruby" },
  { id: "php", value: "PHP" },
  { id: "scala", value: "Scala" },
  { id: "dart", value: "Dart" },
  { id: "elixir", value: "Elixir" },
  { id: "lua", value: "Lua" },
  { id: "zig", value: "Zig" },
  { id: "nim", value: "Nim" },
  { id: "haskell", value: "Haskell" },
];
