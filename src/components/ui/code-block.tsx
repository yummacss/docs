import CodeChrome from "@/components/ui/code";
import { highlight } from "@/lib/highlighter";

interface Props {
  code?: string;
  meta?: string;
  title?: string;
  lang?: string;
  preview?: boolean;
  grouped?: boolean;
}

/**
 * Server half of the code block.
 *
 * Runs Shiki during page generation & hands the resulting HTML to the client
 * chrome, so the highlighted markup lands in the generated page rather than in
 * a compiled MDX module. That distinction is the whole point: the module-graph
 * version is what OOMs the Vercel builder.
 */
export default function CodeBlock({ code = "", meta, title, ...rest }: Props) {
  const html = highlight(code, rest.lang, meta, title);

  return <CodeChrome {...rest} title={title} html={html} raw={code} />;
}
