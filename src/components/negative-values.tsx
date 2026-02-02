interface Props {
  prefix: string;
}

export default function NegativeValues({ prefix }: Props) {
  return (
    <div className="mb-6">
      <p className="mb-4 c-white/80">
        You can use negative values with the{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          --
        </code>{" "}
        syntax to apply negative numeric values. For example,{" "}
        <code
          className="fs-sm px-2 py-1"
          style={{ backgroundColor: "#21243f" }}
        >
          {prefix}--4
        </code>{" "}
        applies a negative.
      </p>
    </div>
  );
}
