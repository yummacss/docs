#!/bin/sh
# run from the docs root so content-collections, the MDX plugins and yumma.config.mjs read paths as the Next build does
cd "$(dirname "$0")/.." && exec spike/node_modules/.bin/vite "$@" --config spike/vite.config.ts
