interface HoverVariantProps {
  classPrefix: string;
}

export default function HoverVariant({ classPrefix }: HoverVariantProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 c-white/80">
        Alternatively, you can apply{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          :hover
        </code>{" "}
        by using{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          h:{classPrefix}-*
        </code>{" "}
        utility to override elements and change their values when hovering over
        them.
      </p>
    </div>
  );
}
