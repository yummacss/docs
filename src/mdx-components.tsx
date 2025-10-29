import { Tabs, TabsList, TabsPanel, TabsTab } from "@yummacss/ui";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import ApiTable from "@/components/api-table";
import HoverVariant from "@/components/hover-variant";
import LegacyColor from "@/components/legacy/legacy-color";
import LegacyPalette from "@/components/legacy/legacy-palette";
import LegacyTable from "@/components/legacy/legacy-table";
import MediaVariant from "@/components/media-variant";
import Note from "@/components/note";
import Palette from "@/components/palette";
import Stepper, { Step } from "@/components/stepper";

// Helper function to generate IDs from heading text
function generateId(children: React.ReactNode): string {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const components: MDXComponents = {
  h1: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return (
      <h1 id={id} className="fs-4xl fw-400 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return (
      <h2 id={id} className="fs-xxl fw-400 mt-12 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return (
      <h3 id={id} className="fs-xl fw-400 mt-8 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => (
    <h4 className="fs-lg fw-500 mt-6 my-3 lh-1 tc-white" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="fs-md fw-500 mt-4 my-3 lh-1 tc-white" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="fs-sm fw-500 mt-4 my-2 lh-1 tc-white" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="my-4 tc-white/80" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a className="h:td-u" style={{ color: "#bec6f2" }} {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-6 ml-6" style={{ listStyle: "disc" }} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-6" style={{ listStyle: "decimal" }} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="my-2 tc-white/80" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="bl-2 pl-2"
      style={{ borderColor: "#31365e" }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: ({ ...props }) => <hr className="my-8 bc-white/5" {...props} />,
  table: ({ children, ...props }) => (
    <div className="o-x-auto my-6">
      <table
        className="w-full bc-c"
        style={{ backgroundColor: "#21243fa6" }}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-white/5" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-2 ta-l b-1 tc-white fw-500"
      style={{ borderColor: "#31365e" }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-2 b-1 tc-white/80"
      style={{ borderColor: "#31365e" }}
      {...props}
    >
      {children}
    </td>
  ),
  code: ({ children, ...props }) => (
    <code
      className="px-2 py-1"
      style={{ backgroundColor: "#21243f" }}
      {...props}
    >
      {children}
    </code>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src}
      alt={alt || ""}
      className="w-full h-auto rad-2 my-4"
      width={800}
      height={400}
      {...props}
    />
  ),
  // Custom components for MDX
  ApiTable,
  HoverVariant,
  MediaVariant,
  Palette,
  LegacyColor,
  LegacyPalette,
  LegacyTable,
  Note,
  Stepper,
  Step,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
