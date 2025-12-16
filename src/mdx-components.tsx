import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import ApiTable from "@/components/api-table";
import Baseline from "@/components/baseline";
import HoverVariant from "@/components/hover-variant";
import LegacyColor from "@/components/legacy/legacy-color";
import LegacyPalette from "@/components/legacy/legacy-palette";
import LegacyTable from "@/components/legacy/legacy-table";
import MediaVariant from "@/components/media-variant";
import Note from "@/components/note";
import Palette from "@/components/palette";
import Stepper, { Step } from "@/components/stepper";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import Preview from "./components/preview";

// generate IDs from heading text
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
    return props.className ? (
      <h1 id={id} {...props}>
        {children}
      </h1>
    ) : (
      <h1 id={id} className="fs-4xl fw-400 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h2 id={id} {...props}>
        {children}
      </h2>
    ) : (
      <h2 id={id} className="fs-xxl fw-400 mt-12 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h3 id={id} {...props}>
        {children}
      </h3>
    ) : (
      <h3 id={id} className="fs-xl fw-400 mt-8 mb-4 lh-1 tc-white" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) =>
    props.className ? (
      <h4 {...props}>{children}</h4>
    ) : (
      <h4 className="fs-lg fw-500 mt-6 my-3 lh-1 tc-white" {...props}>
        {children}
      </h4>
    ),
  h5: ({ children, ...props }) =>
    props.className ? (
      <h5 {...props}>{children}</h5>
    ) : (
      <h5 className="fs-md fw-500 mt-4 my-3 lh-1 tc-white" {...props}>
        {children}
      </h5>
    ),
  h6: ({ children, ...props }) =>
    props.className ? (
      <h6 {...props}>{children}</h6>
    ) : (
      <h6 className="fs-sm fw-500 mt-4 my-2 lh-1 tc-white" {...props}>
        {children}
      </h6>
    ),
  p: ({ children, ...props }) =>
    props.className ? (
      <p {...props}>{children}</p>
    ) : (
      <p className="my-4 tc-white/80" {...props}>
        {children}
      </p>
    ),
  a: ({ children, ...props }) =>
    props.className ? (
      <a {...props}>{children}</a>
    ) : (
      <a className="h:td-u" style={{ color: "#bec6f2" }} {...props}>
        {children}
      </a>
    ),
  ul: ({ children, ...props }) =>
    props.className ? (
      <ul {...props}>{children}</ul>
    ) : (
      <ul className="my-6 ml-6" style={{ listStyle: "disc" }} {...props}>
        {children}
      </ul>
    ),
  ol: ({ children, ...props }) =>
    props.className ? (
      <ol {...props}>{children}</ol>
    ) : (
      <ol className="my-6 ml-6" style={{ listStyle: "decimal" }} {...props}>
        {children}
      </ol>
    ),
  li: ({ children, ...props }) =>
    props.className ? (
      <li {...props}>{children}</li>
    ) : (
      <li className="my-2 tc-white/80" {...props}>
        {children}
      </li>
    ),
  blockquote: ({ children, ...props }) =>
    props.className ? (
      <blockquote {...props}>{children}</blockquote>
    ) : (
      <blockquote
        className="bl-2 pl-2"
        style={{ borderColor: "#9aa6ef" }}
        {...props}
      >
        {children}
      </blockquote>
    ),
  hr: ({ ...props }) =>
    props.className ? (
      <hr {...props} />
    ) : (
      <hr className="my-8 bc-white/5" {...props} />
    ),
  table: ({ children, ...props }) =>
    props.className ? (
      <table {...props}>{children}</table>
    ) : (
      <div className="o-x-auto my-6">
        <table
          className="w-full bc-c"
          style={{ backgroundColor: "transparent" }}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
  thead: ({ children, ...props }) =>
    props.className ? (
      <thead {...props}>{children}</thead>
    ) : (
      <thead className="bg-white/5" {...props}>
        {children}
      </thead>
    ),
  th: ({ children, ...props }) =>
    props.className ? (
      <th {...props}>{children}</th>
    ) : (
      <th
        className="px-4 py-2 ta-l b-1 tc-white fw-500"
        style={{ borderColor: "#31365e" }}
        {...props}
      >
        {children}
      </th>
    ),
  td: ({ children, ...props }) =>
    props.className ? (
      <td {...props}>{children}</td>
    ) : (
      <td
        className="px-4 py-2 b-1 tc-white/80"
        style={{ borderColor: "#31365e" }}
        {...props}
      >
        {children}
      </td>
    ),
  code: ({ children, ...props }) =>
    props.className ? (
      <code {...props}>{children}</code>
    ) : (
      <code
        className="px-2 py-1"
        style={{ backgroundColor: "#21243f" }}
        {...props}
      >
        {children}
      </code>
    ),
  strong: ({ children, ...props }) =>
    props.className ? (
      <strong {...props}>{children}</strong>
    ) : (
      <strong className="fw-600" {...props}>
        {children}
      </strong>
    ),
  img: ({ src, alt, ...props }) =>
    props.className ? (
      // biome-ignore lint/performance/noImgElement: i know what i'm doing
      <img src={src} alt={alt || ""} {...props} />
    ) : (
      <Image
        src={src as string}
        alt={alt || ""}
        className="w-full h-auto my-4"
        quality={100}
        width={1920}
        height={1080}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        {...props}
      />
    ),
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
  // docs components
  ApiTable,
  Baseline,
  HoverVariant,
  LegacyColor,
  LegacyPalette,
  LegacyTable,
  MediaVariant,
  Note,
  Palette,
  Preview,
  Step,
  Stepper,
  Steps: Stepper, // Alias for Stepper
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
