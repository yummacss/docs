import { allUis } from "content-collections";

export const dynamicParams = false;

export function generateStaticParams() {
  return allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({ slug: ui._meta.path }));
}

function renderUiMarkdown(ui: {
  title: string;
  description?: string;
  content?: string;
}): string {
  const raw = ui.content ?? "";

  const body = raw
    // Strip all JSX component tags (self-closing)
    .replace(/<[A-Z][A-Za-z]*(\s[^>]*)?\s*\/>/g, "")
    // Clean up excessive blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const lines = [`# ${ui.title}`, ""];
  if (ui.description) lines.push(ui.description, "");
  if (body) lines.push(body);

  return lines.join("\n");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);

  if (!ui) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = renderUiMarkdown(ui);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
