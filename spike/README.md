# TanStack Start spike

The docs site on TanStack Start with React Server Components, rendering the
Next layouts and pages from `../src` unchanged. `shims/` maps `next/link`,
`next/navigation` and `next/image` onto the router. Not ported: the API
routes (search, `.md` twins, `llms.txt`), the covers and the redirects.

    pnpm --dir spike install --ignore-workspace
    spike/run.sh build
    node spike/serve.mjs   # http://localhost:3200

Measured 2026-10-11, same machine, Chromium, against a Next production server:

| | Next | TanStack Start |
| --- | --- | --- |
| `/docs/display` JS gzipped | 295KB, 20 files | 316KB, 75 files |
| `/ui/components/button` JS gzipped | 364KB, 27 files | 318KB, 79 files |
| `/docs/display` TBT, 4x CPU, median of 5 | 468ms | 310ms |
| `/ui/components/button` TBT, 4x CPU, median of 5 | 743ms | 256ms |
| clean build | 48.7s, 411 outputs, with TypeScript and covers | 23.8s, 202 pages |
