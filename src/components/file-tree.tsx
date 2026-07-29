import { Folder, Page } from "iconoir-react";

interface Entry {
  name: string;
  /**
   * Defaults to a file. Set for directories, with or without children.
   */
  folder?: boolean;
  /**
   * Draws attention to the entry the surrounding prose is about.
   */
  highlight?: boolean;
  children?: Entry[];
}

interface Props {
  data: Entry[];
}

function Row({ entry, depth }: { entry: Entry; depth: number }) {
  const isFolder = entry.folder || Boolean(entry.children?.length);

  return (
    <>
      <li
        className={`d-f ai-c g-2 py-1 ${entry.highlight ? "c-accent" : "c-white/80"}`}
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        {isFolder ? (
          <Folder className="fs-0 w-4 h-4 c-white/40" />
        ) : (
          <Page className="fs-0 w-4 h-4 c-white/40" />
        )}
        <span className="fs-sm ff-m">{entry.name}</span>
      </li>

      {entry.children?.map((child) => (
        <Row key={child.name} entry={child} depth={depth + 1} />
      ))}
    </>
  );
}

export default function FileTree({ data }: Props) {
  return (
    <div className="my-6 p-4 bc-border bg-surface bw-1">
      <ul className="d-f fd-c m-0 ml-0 lst-none">
        {data.map((entry) => (
          <Row key={entry.name} entry={entry} depth={0} />
        ))}
      </ul>
    </div>
  );
}
