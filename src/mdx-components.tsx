import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Baseline from "@/components/baseline";
import Hint from "@/components/hint";
import HoverVariant from "@/components/hover-variant";
import LegacyColor from "@/components/legacy/legacy-color";
import LegacyPalette from "@/components/legacy/legacy-palette";
import LegacyTable from "@/components/legacy/legacy-table";
import NegativeValues from "@/components/negative-values";
import OpacityModifier from "@/components/opacity-modifier";
import Palette from "@/components/palette";
import Preview from "@/components/preview";
import Reference from "@/components/reference";
import ResponsiveVariant from "@/components/responsive-variant";
import Stepper, { Step } from "@/components/stepper";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import FAQ from "@/components/ui/templates/faq";
import TemplatesList from "@/components/ui/templates/list";

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
  // docs components
  Baseline,
  Hint,
  HoverVariant,
  LegacyColor,
  LegacyPalette,
  LegacyTable,
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
  FAQ,
  TemplatesList,
  h1: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h1 id={id} {...props}>
        {children}
      </h1>
    ) : (
      <h1 id={id} className="fs-4xl fw-400 mb-4 lh-1 c-white" {...props}>
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
      <h2 id={id} className="fs-xxl fw-400 mt-12 mb-4 lh-1 c-white" {...props}>
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
      <h3 id={id} className="fs-xl fw-400 mt-8 mb-4 lh-1 c-white" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) =>
    props.className ? (
      <h4 {...props}>{children}</h4>
    ) : (
      <h4 className="fs-lg fw-500 mt-6 my-3 lh-1 c-white" {...props}>
        {children}
      </h4>
    ),
  h5: ({ children, ...props }) =>
    props.className ? (
      <h5 {...props}>{children}</h5>
    ) : (
      <h5 className="fs-md fw-500 mt-4 my-3 lh-1 c-white" {...props}>
        {children}
      </h5>
    ),
  h6: ({ children, ...props }) =>
    props.className ? (
      <h6 {...props}>{children}</h6>
    ) : (
      <h6 className="fs-sm fw-500 mt-4 my-2 lh-1 c-white" {...props}>
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
      <a
        className="h:td-u fv:oc-indigo-4 fv:ow-2"
        style={{ color: "#bec6f2" }}
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
      <li className="my-2 c-white/80" {...props}>
        {children}
      </li>
    ),
  blockquote: ({ children, ...props }) =>
    props.className ? (
      <blockquote {...props}>{children}</blockquote>
    ) : (
      <blockquote
        className="blw-2 pl-2"
        style={{ borderColor: "#31365e" }}
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
        <table className="w-full bc-c bg-transparent bc-white/10" {...props}>
          {children}
        </table>
      </div>
    ),
  thead: ({ children, ...props }) =>
    props.className ? (
      <thead {...props}>{children}</thead>
    ) : (
      <thead style={{ backgroundColor: "#1a1d2e" }} {...props}>
        {children}
      </thead>
    ),
  th: ({ children, ...props }) =>
    props.className ? (
      <th {...props}>{children}</th>
    ) : (
      <th
        className="px-4 py-2 ta-l bw-1 c-white fw-500"
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
        className="px-4 py-2 bw-1 c-white/80"
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
      <code className="fs-md ff-m" style={{ color: "#dda2f6" }} {...props}>
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
      className={className || "w-full h-auto my-4"}
      style={{ backgroundColor: "#21243f" }}
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
