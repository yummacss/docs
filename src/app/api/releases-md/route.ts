import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

/**
 * Serves the changelog verbatim at `/releases.md` via a rewrite.
 *
 * The source is already markdown, so there is nothing to render: an agent
 * reading this gets the same bytes the monorepo publishes.
 */
export function GET() {
  const path = join(process.cwd(), "src/data/changelog.md");
  const markdown = readFileSync(path, "utf-8");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
