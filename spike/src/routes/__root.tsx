import "@fontsource/esteban";
import "@fontsource/ia-writer-quattro/latin-400.css";
import "@fontsource/ia-writer-quattro/latin-400-italic.css";
import "@fontsource/ia-writer-quattro/latin-700.css";
import "@fontsource/ia-writer-quattro/latin-700-italic.css";
import globals from "@/styles/globals.css?url";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
    links: [{ rel: "stylesheet", href: globals }, { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  }),
  component: () => (
    <html className="sb:s spt:20 cs:ld s::bg:accent-dim/10" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg:page ff:body">
        <NuqsAdapter>
          <Outlet />
        </NuqsAdapter>
        <Scripts />
      </body>
    </html>
  ),
});
