// prerendered files first, the Start handler for everything else (server functions, RSC payloads)
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import server from "./dist/server/server.js";

const root = path.join(import.meta.dirname, "dist/client");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".png": "image/png", ".ico": "image/x-icon" };

async function file(p) {
  for (const f of [p, path.join(p, "index.html")]) {
    try { if ((await stat(f)).isFile()) return f; } catch {}
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const f = url.pathname !== "/" && (await file(path.join(root, decodeURIComponent(url.pathname))));
  if (f) {
    res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
    return res.end(await readFile(f));
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const response = await server.fetch(new Request(url, { method: req.method, headers: req.headers, body: chunks.length ? Buffer.concat(chunks) : undefined }));
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(process.env.PORT ?? 3200);
