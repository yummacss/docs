interface OpacityVariantProps {
  classPrefix: string;
}

export default function OpacityVariant({ classPrefix }: OpacityVariantProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 c-white/80">
        You can also control the opacity of colors using opacity modifiers with{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-*
        </code>{" "}
        syntax, where{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          *
        </code>{" "}
        represents the opacity value (e.g.,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-*/25
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-*/50
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-*/75
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-*/100
        </code>
        ) to create semi-transparent versions of the base color.
      </p>
    </div>
  );
}
