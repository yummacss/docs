export const sidebarConfig: SidebarConfig = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Configuration", slug: "configuration", updated: true },
      { title: "Creating Apps", slug: "creating-apps" },
      { title: "IDE Support", slug: "ide-support" },
      { title: "Upgrading", slug: "upgrading" },
    ],
  },
  {
    title: "Handbook",
    items: [
      { title: "Styling Elements", slug: "styling-elements" },
      { title: "Colors", slug: "colors" },
      { title: "Media Queries", slug: "media-queries" },
      { title: "Container Queries", slug: "container-queries" },
      { title: "Negative Values", slug: "negative-values", updated: true },
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
          { title: "Border Top Radius", slug: "border-top-radius" },
          { title: "Border Right Radius", slug: "border-right-radius" },
          { title: "Border Bottom Radius", slug: "border-bottom-radius" },
          { title: "Border Left Radius", slug: "border-left-radius" },
          { title: "Border Top Left Radius", slug: "border-top-left-radius" },
          { title: "Border Top Right Radius", slug: "border-top-right-radius" },
          {
            title: "Border Bottom Left Radius",
            slug: "border-bottom-left-radius",
          },
          {
            title: "Border Bottom Right Radius",
            slug: "border-bottom-right-radius",
          },
          { title: "Border Spacing", slug: "border-spacing" },
          { title: "Border Style", slug: "border-style" },
          { title: "Border Width", slug: "border-width" },
          { title: "Border Top Width", slug: "border-top-width" },
          { title: "Border Right Width", slug: "border-right-width" },
          { title: "Border Bottom Width", slug: "border-bottom-width" },
          { title: "Border Left Width", slug: "border-left-width" },
          { title: "Border Block Width", slug: "border-block-width" },
          { title: "Border Inline Width", slug: "border-inline-width" },
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
      { title: "Aspect Ratio", slug: "aspect-ratio" },
      { title: "Box Sizing", slug: "box-sizing" },
      {
        title: "Height",
        children: [
          { title: "Height", slug: "height" },
          { title: "Max Height", slug: "max-height" },
          { title: "Min Height", slug: "min-height" },
        ],
      },
      {
        title: "Margin",
        children: [
          { title: "Margin", slug: "margin" },
          { title: "Margin Top", slug: "margin-top" },
          { title: "Margin Right", slug: "margin-right" },
          { title: "Margin Bottom", slug: "margin-bottom" },
          { title: "Margin Left", slug: "margin-left" },
          { title: "Margin Block", slug: "margin-block" },
          { title: "Margin Block Start", slug: "margin-block-start" },
          { title: "Margin Block End", slug: "margin-block-end" },
          { title: "Margin Inline", slug: "margin-inline" },
          { title: "Margin Inline Start", slug: "margin-inline-start" },
          { title: "Margin Inline End", slug: "margin-inline-end" },
        ],
      },
      {
        title: "Padding",
        children: [
          { title: "Padding", slug: "padding" },
          { title: "Padding Top", slug: "padding-top" },
          { title: "Padding Right", slug: "padding-right" },
          { title: "Padding Bottom", slug: "padding-bottom" },
          { title: "Padding Left", slug: "padding-left" },
          { title: "Padding Block", slug: "padding-block" },
          { title: "Padding Block Start", slug: "padding-block-start" },
          { title: "Padding Block End", slug: "padding-block-end" },
          { title: "Padding Inline", slug: "padding-inline" },
          { title: "Padding Inline Start", slug: "padding-inline-start" },
          { title: "Padding Inline End", slug: "padding-inline-end" },
        ],
      },
      {
        title: "Width",
        children: [
          { title: "Width", slug: "width" },
          { title: "Max Width", slug: "max-width" },
          { title: "Min Width", slug: "min-width" },
        ],
      },
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
    title: "Effects",
    items: [
      { title: "Backdrop Blur", slug: "backdrop-blur" },
      { title: "Backdrop Grayscale", slug: "backdrop-grayscale" },
      { title: "Blur", slug: "blur" },
      { title: "Box Shadow", slug: "box-shadow" },
      { title: "Grayscale", slug: "grayscale" },
      { title: "Mix Blend Mode", slug: "mix-blend-mode" },
      { title: "Opacity", slug: "opacity" },
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
          { title: "Grid Column End", slug: "grid-column-end" },
          { title: "Grid Column Span", slug: "grid-column-span" },
          { title: "Grid Column Start", slug: "grid-column-start" },
          { title: "Grid Row", slug: "grid-row" },
          { title: "Grid Row End", slug: "grid-row-end" },
          { title: "Grid Row Span", slug: "grid-row-span" },
          { title: "Grid Row Start", slug: "grid-row-start" },
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
    title: "Interactivity",
    items: [
      { title: "Appearance", slug: "appearance" },
      { title: "Cursor", slug: "cursor" },
      { title: "Field Sizing", slug: "field-sizing" },
      { title: "Overscroll Behavior", slug: "overscroll-behavior" },
      {
        title: "Overscroll Behavior Block",
        slug: "overscroll-behavior-block",
      },
      {
        title: "Overscroll Behavior Inline",
        slug: "overscroll-behavior-inline",
      },
      { title: "Overscroll Behavior X", slug: "overscroll-behavior-x" },
      { title: "Overscroll Behavior Y", slug: "overscroll-behavior-y" },
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
    title: "Layout",
    items: [
      { title: "Clear", slug: "clear" },
      { title: "Columns", slug: "columns" },
      { title: "Container Type", slug: "container-type", updated: true },
      { title: "Display", slug: "display" },
      { title: "Float", slug: "float" },
      { title: "Isolation", slug: "isolation" },
    ],
  },
  {
    title: "Positioning",
    items: [
      { title: "Bottom", slug: "bottom" },
      { title: "Inset", slug: "inset" },
      { title: "Left", slug: "left" },
      { title: "Object Fit", slug: "object-fit" },
      { title: "Object Position", slug: "object-position" },
      { title: "Overflow", slug: "overflow" },
      { title: "Overflow X", slug: "overflow-x" },
      { title: "Overflow Y", slug: "overflow-y" },
      { title: "Position", slug: "position" },
      { title: "Right", slug: "right" },
      { title: "Top", slug: "top" },
      { title: "Visibility", slug: "visibility" },
      { title: "Z-Index", slug: "z-index" },
    ],
  },
  {
    title: "SVG",
    items: [{ title: "Stroke Width", slug: "stroke-width" }],
  },
  {
    title: "Table",
    items: [
      { title: "Caption Side", slug: "caption-side" },
      { title: "Empty Cells", slug: "empty-cells" },
      { title: "Table Layout", slug: "table-layout" },
    ],
  },
  {
    title: "Transform",
    items: [
      { title: "Rotate", slug: "rotate" },
      { title: "Scale", slug: "scale" },
      { title: "Skew X", slug: "skew-x" },
      { title: "Skew Y", slug: "skew-y" },
      { title: "Skew", slug: "skew" },
      { title: "Transform Origin", slug: "transform-origin" },
      { title: "Translate", slug: "translate" },
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
        title: "Fonts",
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
          { title: "Word Break", slug: "word-break" },
          { title: "Writing Mode", slug: "writing-mode" },
        ],
      },
    ],
  },
];

export interface SidebarConfigItemBase {
  title: string;
  slug?: string;
  updated?: boolean;
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

  return slugs;
}

// find the current page info from pathname
export function findCurrentPageInfo(pathname: string): {
  sectionTitle: string;
  pageTitle: string;
} | null {
  // remove /docs/ prefix and get the slug
  const slug = pathname.replace(/^\/docs\//, "");

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
