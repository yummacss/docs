import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Baseline from "@/components/baseline";
import ComponentPreview from "@/components/component-preview";
import Hint from "@/components/hint";
import HoverVariant from "@/components/hover-state";
import { Cursor, VisualStudioCode, Windsurf, Zed } from "@/components/icons/editors";
import NegativeValues from "@/components/negative-values";
import OpacityModifier from "@/components/opacity-modifier";
import Palette from "@/components/palette";
import Preview from "@/components/preview";
import Reference from "@/components/reference";
import ResponsiveVariant from "@/components/responsive-variant";
import Stepper, { Step } from "@/components/stepper";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import Code from "@/components/ui/code";

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
    .replace(/['']/g, "") // strip apostrophes first
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const components: MDXComponents = {
  Baseline,
  Code,
  ComponentPreview,
  Cursor,
  Hint,
  HoverVariant,
  NegativeValues,
  OpacityModifier,
  Palette,
  Preview,
  Reference,
  ResponsiveVariant,
  Step,
  Stepper,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  VisualStudioCode,
  Windsurf,
  Zed,
  h1: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h1 id={id} {...props}>
        {children}
      </h1>
    ) : (
      <h1 id={id} className="mb-4 c-white fs-4xl fw-400 lh-1" {...props}>
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
      <h2 id={id} className="mt-12 mb-4 c-white fs-xxl fw-400 lh-1" {...props}>
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
      <h3 id={id} className="mt-8 mb-4 c-white fs-xl fw-400 lh-1" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) =>
    props.className ? (
      <h4 {...props}>{children}</h4>
    ) : (
      <h4 className="mt-6 my-3 c-white fs-lg fw-500 lh-1" {...props}>
        {children}
      </h4>
    ),
  h5: ({ children, ...props }) =>
    props.className ? (
      <h5 {...props}>{children}</h5>
    ) : (
      <h5 className="mt-4 my-3 c-white fs-md fw-500 lh-1" {...props}>
        {children}
      </h5>
    ),
  h6: ({ children, ...props }) =>
    props.className ? (
      <h6 {...props}>{children}</h6>
    ) : (
      <h6 className="mt-4 my-2 c-white fs-sm fw-500 lh-1" {...props}>
        {children}
      </h6>
    ),
  p: ({ children, ...props }) =>
    props.className ? (
      <p {...props}>{children}</p>
    ) : (
      <p className="my-4 c-white/80" {...props}>
        {children}
      </p>
    ),
  a: ({ children, ...props }) =>
    props.className ? (
      <a {...props}>{children}</a>
    ) : (
      <a className="c-accent h:td-u fv:oc-white fv:ow-2" {...props}>
        {children}
      </a>
    ),
  ul: ({ children, ...props }) =>
    props.className ? (
      <ul {...props}>{children}</ul>
    ) : (
      <ul className="my-6 ml-6 lst-d" {...props}>
        {children}
      </ul>
    ),
  ol: ({ children, ...props }) =>
    props.className ? (
      <ol {...props}>{children}</ol>
    ) : (
      <ol className="my-6 ml-6 lst-d" {...props}>
        {children}
      </ol>
    ),
  li: ({ children, ...props }) =>
    props.className ? (
      <li {...props}>{children}</li>
    ) : (
      <li className="my-2 c-white/80" {...props}>
        {children}
      </li>
    ),
  blockquote: ({ children, ...props }) =>
    props.className ? (
      <blockquote {...props}>{children}</blockquote>
    ) : (
      <blockquote className="pl-2 bc-border blw-2" {...props}>
        {children}
      </blockquote>
    ),
  hr: ({ ...props }) =>
    props.className ? (
      <hr {...props} />
    ) : (
      <hr className="my-8 bc-border bw-1 bs-d" {...props} />
    ),
  table: ({ children, ...props }) =>
    props.className ? (
      <table {...props}>{children}</table>
    ) : (
      <div className="ox-auto my-6">
        <table className="w-100% bc-border bg-transparent bc-c" {...props}>
          {children}
        </table>
      </div>
    ),
  thead: ({ children, ...props }) =>
    props.className ? (
      <thead {...props}>{children}</thead>
    ) : (
      <thead className="bg-surface" {...props}>
        {children}
      </thead>
    ),
  th: ({ children, ...props }) =>
    props.className ? (
      <th {...props}>{children}</th>
    ) : (
      <th className="px-4 py-2 bc-border c-white bw-1 ta-l fw-500" {...props}>
        {children}
      </th>
    ),
  td: ({ children, ...props }) =>
    props.className ? (
      <td {...props}>{children}</td>
    ) : (
      <td className="px-4 py-2 bc-border c-white/80 bw-1" {...props}>
        {children}
      </td>
    ),
  code: ({ children, className, ...props }) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="c-code fs-md ff-m" {...props}>
        {children}
      </code>
    );
  },
  strong: ({ children, ...props }) =>
    props.className ? (
      <strong {...props}>{children}</strong>
    ) : (
      <strong className="fw-600" {...props}>
        {children}
      </strong>
    ),
  img: ({ src, alt, className, ...props }) => (
    <Image
      src={src as string}
      alt={alt || ""}
      className={`${className || "w-100% h-auto my-4"} bc-border bg-surface bw-1`}
      unoptimized
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      {...props}
    />
  ),
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
