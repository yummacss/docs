import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Baseline from "@/components/baseline";
import Hint from "@/components/hint";
import HoverVariant from "@/components/hover-state";
import NegativeValues from "@/components/negative-values";
import OpacityModifier from "@/components/opacity-modifier";
import Palette from "@/components/palette";
import Preview from "@/components/preview";
import Reference from "@/components/reference";
import ResponsiveVariant from "@/components/responsive-variant";
import Stepper, { Step } from "@/components/stepper";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";

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
  Hint,
  HoverVariant,
  ResponsiveVariant,
  NegativeValues,
  OpacityModifier,
  Palette,
  Preview,
  Reference,
  Step,
  Stepper,
  Steps: Stepper, // Alias for Stepper
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
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
      <p className="c-white/80 my-4" {...props}>
        {children}
      </p>
    ),
  a: ({ children, ...props }) =>
    props.className ? (
      <a {...props}>{children}</a>
    ) : (
      <a
        className="h:td-u fv:oc-white fv:ow-2 c-periwinkle"
        {...props}
      >
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
      <li className="c-white/80 my-2" {...props}>
        {children}
      </li>
    ),
  blockquote: ({ children, ...props }) =>
    props.className ? (
      <blockquote {...props}>{children}</blockquote>
    ) : (
      <blockquote
        className="pl-2 blw-2 bc-navy"
        {...props}
      >
        {children}
      </blockquote>
    ),
  hr: ({ ...props }) =>
    props.className ? (
      <hr {...props} />
    ) : (
      <hr className="my-8 bc-white/10" {...props} />
    ),
  table: ({ children, ...props }) =>
    props.className ? (
      <table {...props}>{children}</table>
    ) : (
      <div className="o-x-auto my-6">
        <table className="w-full bc-white/10 bg-transparent bc-c" {...props}>
          {children}
        </table>
      </div>
    ),
  thead: ({ children, ...props }) =>
    props.className ? (
      <thead {...props}>{children}</thead>
    ) : (
      <thead className="bg-midnight" {...props}>
        {children}
      </thead>
    ),
  th: ({ children, ...props }) =>
    props.className ? (
      <th {...props}>{children}</th>
    ) : (
      <th
        className="px-4 py-2 c-white bw-1 ta-l fw-500 bc-navy"
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
        className="c-white/80 px-4 py-2 bw-1 bc-navy"
        {...props}
      >
        {children}
      </td>
    ),
  code: ({ children, ...props }) =>
    props.className ? (
      <code {...props}>{children}</code>
    ) : (
      <code className="fs-md ff-m c-amethyst" {...props}>
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
  img: ({ src, alt, className, ...props }) => (
    <Image
      src={src as string}
      alt={alt || ""}
      className={(className || "w-full h-auto my-4") + " bg-charcoal"}
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
