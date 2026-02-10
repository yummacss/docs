"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAutocomplete() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={languages} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="autocomplete-input" className="fs-sm fw-600 c-slate-10">
          Programming language
        </label>
        <Autocomplete.Input
          id="autocomplete-input"
          placeholder="e.g. TypeScript"
          className="h-10 w-64 bw-1 bc-silver-3 br-2 bg-white pl-4 fs-sm c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="w-64 bw-1 bc-silver-2 br-2 bg-white bsh-lg c-slate-10 o-h py-1"
              >
                <Autocomplete.Empty className="py-4 px-4 fs-sm c-slate-6">
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
