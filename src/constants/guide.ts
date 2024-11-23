import { getMinifiedImport } from "../functions/getMinifiedImport";

export const guide = {
  angular: {
    inCSS: getMinifiedImport("../node_modules/yummacss/dist/yumma.min.css"),
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Angular</h1>
</div>
    `,
  },
  astro: {
    inCSS: `
<style is:global>
    ${getMinifiedImport("/node_modules/yummacss/dist/yumma.min.css")}
</style>
    `,
    onPage: `
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Welcome to Astro.">
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Astro</h1>
    </div>
</Layout>
    `,
  },
  static: {
    inCSS: `
      ${getMinifiedImport("https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@latest/dist/yumma.min.css")}
    `,
    onPage: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="app.css" />
    </head>
    <body>
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Static</h1>
        </div>
    </body>
    </html>
      `,
  },
  nextjs: {
    inCSS: getMinifiedImport("yummacss/dist/yumma.min.css"),
    onPage: `
export default function Home() {
    return (
        <div className="h-1/1 ins">
            <h1 className="fs-xxl fw-500 tc-pink">Yumma CSS + Next.js</h1>
        </div>
    );
}
    `,
  },
  nodejs: {
    inCSS: getMinifiedImport(),
    onPage: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <div class="h-1/1 ins">
      <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Node.js</h1>
    </div>
  </body>
</html>
    `,
  },
  nuxtjs: {
    inCSS: getMinifiedImport(),
    onConfig: `
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["/assets/global.css"],
});
    `,
    onPage: `
<template>
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Nuxt.js</h1>
    </div>
</template>
    `,
  },
  preact: {
    inCSS: getMinifiedImport(),
    onPage: `
export function Home() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Preact</h1>
        </div>
    );
}
    `,
  },
  react: {
    inCSS: getMinifiedImport(),
    onPage: `
import "./App.css";

function App() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + React</h1>
        </div>
    );
}

export default App;
    `,
  },
  solidjs: {
    inCSS: getMinifiedImport(),
    onPage: `
function App() {
    return (
        <div class="h-1/1 ins">
            <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Solid.js</h1>
        </div>
    );
}

export default App;
    `,
  },
  svelte: {
    inCSS: getMinifiedImport(),
    onComponent: `
<script>
    import "../global.css";
</script>

<slot />
    `,
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Svelte</h1>
</div>
    `,
  },
  vue: {
    inCSS: getMinifiedImport(),
    onPage: `
<template>
    <div class="h-1/1 ins">
        <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + Vue</h1>
    </div>
</template>
    `,
  },
  dotnet: {
    inCSS: getMinifiedImport("/lib/yummacss/dist/yumma.min.css"),
    onPage: `
<div class="h-1/1 ins">
    <h1 class="fs-xxl fw-500 tc-pink">Yumma CSS + .NET</h1>
</div>
    `,
  },
};
