interface MediaVariantProps {
  classPrefix: string;
}

export default function MediaVariant({ classPrefix }: MediaVariantProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 c-white/80">
        You can combine responsive breakpoints like{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          sm:{classPrefix}-*
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          md:{classPrefix}-*
        </code>
        ,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          lg:{classPrefix}-*
        </code>
        , and{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          xxl:{classPrefix}-*
        </code>{" "}
        to allow targeting specific utilities in different viewports.
      </p>
    </div>
  );
}
