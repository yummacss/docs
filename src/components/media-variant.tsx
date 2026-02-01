interface MediaVariantProps {
  prefix: string;
}

export default function MediaVariant({ prefix }: MediaVariantProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 c-white/80">
        You can combine responsive breakpoints like{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          sm:{prefix}-[utility]
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          md:{prefix}-[utility]
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          lg:{prefix}-[utility]
        </code>
        , and{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          xxl:{prefix}-[utility]
        </code>{" "}
        to allow targeting specific utilities in different viewports.
      </p>
    </div>
  );
}
