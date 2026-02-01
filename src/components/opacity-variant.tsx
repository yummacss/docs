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
          {classPrefix}-[color]
        </code>{" "}
        syntax, where{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >        
          /[number]
        </code>{" "}
        represents the opacity value (e.g.,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-[color]/25
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-[color]/50
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-[color]/75
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {classPrefix}-[color]/100
        </code>
        ).
      </p>
    </div>
  );
}
