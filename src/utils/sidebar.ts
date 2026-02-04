export interface SidebarConfigItemBase {
  title: string;
  slug?: string;
}

export interface SidebarConfigItemWithChildren extends SidebarConfigItemBase {
  children: SidebarConfigSimpleItem[];
}

export interface SidebarConfigSimpleItem extends SidebarConfigItemBase {}

export type SidebarConfigItem =
  | SidebarConfigSimpleItem
  | SidebarConfigItemWithChildren
  | SidebarConfigItemWithItems;

export interface SidebarConfigItemWithItems extends SidebarConfigItemBase {
  items: SidebarConfigItem[];
}

export interface SidebarConfigSection {
  title: string;
  items: SidebarConfigItem[];
}

export type SidebarConfig = SidebarConfigSection[];

// extract all slugs from the sidebar config
export function getAllSlugs(): string[] {
  const slugs: string[] = [];

  function extractSlugs(items: SidebarConfigItem[]) {
    for (const item of items) {
      if (item.slug) {
        slugs.push(item.slug);
      }
      if ("children" in item && Array.isArray(item.children)) {
        extractSlugs(item.children);
      }
      if ("items" in item && Array.isArray(item.items)) {
        extractSlugs(item.items);
      }
    }
  }

  for (const section of sidebarConfig) {
    extractSlugs(section.items);
  }

  // we need to add core-module manually since it's not in the sidebar config
  slugs.push("core-module");

  return slugs;
}

// find the current page info from pathname
export function findCurrentPageInfo(pathname: string): {
  sectionTitle: string;
  pageTitle: string;
} | null {
  // remove /docs/ prefix and get the slug
  const slug = pathname.replace(/^\/docs\//, "");

  // special case for core-module (not in sidebar config)
  if (slug === "core-module") {
    return { sectionTitle: "Installation", pageTitle: "Core Module" };
  }

  function searchInItems(
    items: SidebarConfigItem[],
    sectionTitle: string,
  ): { sectionTitle: string; pageTitle: string } | null {
    for (const item of items) {
      // check if this item has the slug
      if (item.slug === slug) {
        return { sectionTitle, pageTitle: item.title };
      }

      // check in children
      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (child.slug === slug) {
            return { sectionTitle, pageTitle: child.title };
          }
        }
      }

      // check in items recursively
      if ("items" in item && Array.isArray(item.items)) {
        const result = searchInItems(item.items, sectionTitle);
        if (result) return result;
      }
    }

    return null;
  }

  // search through all sections
  for (const section of sidebarConfig) {
    const result = searchInItems(section.items, section.title);
    if (result) return result;
  }

  return null;
}

export const sidebarConfig: SidebarConfig = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Configuration", slug: "configuration" },
      { title: "Upgrading", slug: "upgrading" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Styling Elements", slug: "styling-elements" },
      { title: "Colors", slug: "colors" },
      { title: "Media Queries", slug: "media-queries" },
      { title: "Negative Values", slug: "negative-values" },
      { title: "Pseudo Classes", slug: "pseudo-classes" },
      { title: "Pseudo Elements", slug: "pseudo-elements" },
      { title: "Base Styles", slug: "base-styles" },
    ],
  },
  {
    title: "Background",
    items: [
      { title: "Background Attachment", slug: "background-attachment" },
      { title: "Background Clip", slug: "background-clip" },
      { title: "Background Origin", slug: "background-origin" },
      { title: "Background Position", slug: "background-position" },
      { title: "Background Repeat", slug: "background-repeat" },
      { title: "Background Size", slug: "background-size" },
    ],
  },
  {
    title: "Border & Outline",
    items: [
      {
        title: "Border",
        children: [
          { title: "Border Collapse", slug: "border-collapse" },
          { title: "Border Radius", slug: "border-radius" },
          { title: "Border Spacing", slug: "border-spacing" },
          { title: "Border Style", slug: "border-style" },
          { title: "Border Width", slug: "border-width" },
        ],
      },
      {
        title: "Outline",
        children: [
          { title: "Outline Offset", slug: "outline-offset" },
          { title: "Outline Style", slug: "outline-style" },
          { title: "Outline Width", slug: "outline-width" },
        ],
      },
    ],
  },
  {
    title: "Box Model",
    items: [
      { title: "Box Sizing", slug: "box-sizing" },
      { title: "Dimension", slug: "dimension" },
      { title: "Height", slug: "height" },
      { title: "Margin", slug: "margin" },
      { title: "Padding", slug: "padding" },
      { title: "Width", slug: "width" },
    ],
  },
  {
    title: "Colors",
    items: [
      { title: "Accent Color", slug: "accent-color" },
      { title: "Background Color", slug: "background-color" },
      { title: "Border Color", slug: "border-color" },
      { title: "Caret Color", slug: "caret-color" },
      { title: "Color", slug: "color" },
      { title: "Fill", slug: "fill" },
      { title: "Outline Color", slug: "outline-color" },
      { title: "Stroke", slug: "stroke" },
      { title: "Text Decoration Color", slug: "text-decoration-color" },
    ],
  },
  {
    title: "Flexbox & Grid",
    items: [
      {
        title: "Flexbox",
        children: [
          { title: "Align Content", slug: "align-content" },
          { title: "Align Items", slug: "align-items" },
          { title: "Align Self", slug: "align-self" },
          { title: "Flex", slug: "flex" },
          { title: "Flex Basis", slug: "flex-basis" },
          { title: "Flex Direction", slug: "flex-direction" },
          { title: "Flex Grow", slug: "flex-grow" },
          { title: "Flex Shrink", slug: "flex-shrink" },
          { title: "Flex Wrap", slug: "flex-wrap" },
          { title: "Justify Content", slug: "justify-content" },
          { title: "Justify Items", slug: "justify-items" },
          { title: "Justify Self", slug: "justify-self" },
          { title: "Order", slug: "order" },
        ],
      },
      {
        title: "Grid",
        children: [
          { title: "Column Gap", slug: "column-gap" },
          { title: "Gap", slug: "gap" },
          { title: "Grid Auto Columns", slug: "grid-auto-columns" },
          { title: "Grid Auto Flow", slug: "grid-auto-flow" },
          { title: "Grid Auto Rows", slug: "grid-auto-rows" },
          { title: "Grid Column", slug: "grid-column" },
          { title: "Grid Row", slug: "grid-row" },
          { title: "Grid Template Columns", slug: "grid-template-columns" },
          { title: "Grid Template Rows", slug: "grid-template-rows" },
          { title: "Place Content", slug: "place-content" },
          { title: "Place Items", slug: "place-items" },
          { title: "Place Self", slug: "place-self" },
          { title: "Row Gap", slug: "row-gap" },
        ],
      },
    ],
  },
  {
    title: "Effects",
    items: [
      { title: "Backdrop Blur", slug: "backdrop-blur" },
      { title: "Blur", slug: "blur" },
      { title: "Box Shadow", slug: "box-shadow" },
      { title: "Grayscale", slug: "grayscale" },
      { title: "Opacity", slug: "opacity" },
    ],
  },
  {
    title: "Interactivity",
    items: [
      { title: "Appearance", slug: "appearance" },
      { title: "Cursor", slug: "cursor" },
      { title: "Field Sizing", slug: "field-sizing" },
      { title: "Pointer Events", slug: "pointer-events" },
      { title: "Resize", slug: "resize" },
      { title: "Scroll Behavior", slug: "scroll-behavior" },
      { title: "Scroll Margin", slug: "scroll-margin" },
      { title: "Scroll Padding", slug: "scroll-padding" },
      { title: "Scroll Snap Align", slug: "scroll-snap-align" },
      { title: "Scroll Snap Stop", slug: "scroll-snap-stop" },
      { title: "Scroll Snap Type", slug: "scroll-snap-type" },
      { title: "Touch Action", slug: "touch-action" },
      { title: "User Select", slug: "user-select" },
    ],
  },
  {
    title: "Positioning",
    items: [
      { title: "Aspect Ratio", slug: "aspect-ratio" },
      { title: "Bottom", slug: "bottom" },
      { title: "Clear", slug: "clear" },
      { title: "Columns", slug: "columns" },
      { title: "Display", slug: "display" },
      { title: "Float", slug: "float" },
      { title: "Inset", slug: "inset" },
      { title: "Isolation", slug: "isolation" },
      { title: "Left", slug: "left" },
      { title: "Object Fit", slug: "object-fit" },
      { title: "Object Position", slug: "object-position" },
      { title: "Overflow X", slug: "overflow-x" },
      { title: "Overflow Y", slug: "overflow-y" },
      { title: "Overflow", slug: "overflow" },
      { title: "Position", slug: "position" },
      { title: "Right", slug: "right" },
      { title: "Top", slug: "top" },
      { title: "Visibility", slug: "visibility" },
      { title: "Z-Index", slug: "z-index" },
    ],
  },
  {
    title: "Table",
    items: [
      { title: "Caption Side", slug: "caption-side" },
      { title: "Table Layout", slug: "table-layout" },
    ],
  },
  {
    title: "SVG",
    items: [{ title: "Stroke Width", slug: "stroke-width" }],
  },
  {
    title: "Transform",
    items: [
      { title: "Rotate", slug: "rotate" },
      { title: "Scale", slug: "scale" },
      { title: "Skew", slug: "skew" },
      { title: "Transform Origin", slug: "transform-origin" },
      { title: "Translate X", slug: "translate-x" },
      { title: "Translate Y", slug: "translate-y" },
    ],
  },
  {
    title: "Transition",
    items: [
      { title: "Transition Delay", slug: "transition-delay" },
      { title: "Transition Duration", slug: "transition-duration" },
      { title: "Transition Property", slug: "transition-property" },
      {
        title: "Transition Timing Function",
        slug: "transition-timing-function",
      },
    ],
  },
  {
    title: "Typography",
    items: [
      {
        title: "Font",
        children: [
          { title: "Font Family", slug: "font-family" },
          { title: "Font Size", slug: "font-size" },
          { title: "Font Style", slug: "font-style" },
          { title: "Font Weight", slug: "font-weight" },
        ],
      },
      {
        title: "Text",
        children: [
          { title: "Letter Spacing", slug: "letter-spacing" },
          { title: "Line Height", slug: "line-height" },
          { title: "List Style Position", slug: "list-style-position" },
          { title: "List Style Type", slug: "list-style-type" },
          { title: "Overflow Wrap", slug: "overflow-wrap" },
          { title: "Tab Size", slug: "tab-size" },
          { title: "Text Align", slug: "text-align" },
          { title: "Text Decoration Line", slug: "text-decoration-line" },
          { title: "Text Decoration Style", slug: "text-decoration-style" },
          {
            title: "Text Decoration Thickness",
            slug: "text-decoration-thickness",
          },
          { title: "Text Decoration", slug: "text-decoration" },
          { title: "Text Indent", slug: "text-indent" },
          { title: "Text Overflow", slug: "text-overflow" },
          { title: "Text Transform", slug: "text-transform" },
          { title: "Text Underline Offset", slug: "text-underline-offset" },
          { title: "Text Wrap", slug: "text-wrap" },
          { title: "Vertical Align", slug: "vertical-align" },
          { title: "White Space", slug: "white-space" },
          { title: "Writing Mode", slug: "writing-mode" },
        ],
      },
    ],
  },
];
