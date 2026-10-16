import { generateId } from "@/utils/doc-properties";
import {
  type Category,
  type CompactRow,
  compactRows,
  getPrefix,
  variantGroups,
  variantsLead,
} from "@/utils/yummacss";

interface Props {
  category: Category;
  /** One property, or several that share one scale: then a prefix table leads. */
  name?: string;
  names?: string[];
}

const TABLE = "w:100% bc:c bc:border bg:surface bw:1 ff:m fs:sm";
const HEAD =
  "px:4 py:2 bbw:1 bc:border ta:l ff:system fs:xs fw:600 ls:2 tt:u c:silver-8";
const CELL = "px:4 py:2 bbw:1 bc:border";

const valueOf = (detail: string) =>
  detail.slice(detail.indexOf(": ") + 2).replace(/;$/, "");

function Rows({ rows, prefix }: { rows: CompactRow[]; prefix?: string }) {
  return rows.map((row) =>
    row.kind === "gap" ? (
      <tr key={row.text}>
        <td colSpan={2} className={`${CELL} py:1 c:ink/50 fs:xs`}>
          {row.text}
        </td>
      </tr>
    ) : (
      <tr key={row.className}>
        <td className={`${CELL} w:30% c:code ws:nw`}>
          {prefix === undefined
            ? row.className
            : row.className.slice(prefix.length + 1) || row.className}
        </td>
        <td className={`${CELL} c:ink/70`}>
          {prefix === undefined
            ? row.details.join(" ")
            : row.details.map(valueOf).join(" ")}
        </td>
      </tr>
    ),
  );
}

export default function Reference({ category, name, names }: Props) {
  const all = names ?? (name ? [name] : []);
  const first = all[0];
  if (!first) return null;
  const rows = compactRows(category, first);

  if (all.length === 1) {
    return (
      <div className="ox:auto my:6">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={`${HEAD} w:30%`}>Class</th>
              <th className={HEAD}>CSS</th>
            </tr>
          </thead>
          <tbody>
            <Rows rows={rows} />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="d:f fd:c g:6 my:6">
      <div className="ox:auto">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={`${HEAD} w:30%`}>Prefix</th>
              <th className={HEAD}>Property</th>
            </tr>
          </thead>
          <tbody>
            {all.map((n) => (
              <tr key={n} id={generateId(n)} className="smt:24">
                <td className={`${CELL} w:30% c:code`}>
                  {getPrefix(category, n)}
                </td>
                <td className={`${CELL} c:ink/70`}>{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ox:auto">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={`${HEAD} w:30%`}>Value</th>
              <th className={HEAD}>CSS</th>
            </tr>
          </thead>
          <tbody>
            <Rows rows={rows} prefix={getPrefix(category, first)} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** A sentence with `code` in backticks, set the way the page sets inline code. */
function Prose({ text }: { text: string }) {
  return (
    <p className="my:4 c:ink/80">
      {text.split(/`([^`]+)`/).map((part, i) =>
        i % 2 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: the split's order is the identity
          <code key={i} className="c:code ff:m fs:md">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
}

/** Every kind of variant the utility takes, a table per kind, each row a class to copy. */
export function Variants({
  category,
  name,
  negative = false,
}: {
  category: Category;
  name: string;
  negative?: boolean;
}) {
  const groups = variantGroups(category, name, negative);
  if (groups.length === 0) return null;
  return (
    <>
      <Prose text={variantsLead(category, name)} />
      {groups.map((group) => (
        <section key={group.title}>
          <h3
            id={generateId(group.title)}
            className="mt:8 mb:4 ff:display c:ink fs:xl fw:400 lh:1 smt:24"
          >
            {group.title}
          </h3>
          <Prose text={group.description} />
          <div className="ox:auto">
            <table className={TABLE}>
              <tbody>
                {group.lines.map((line) => (
                  <tr key={line.className}>
                    <td className={`${CELL} w:30% c:code ws:nw`}>
                      {line.className}
                    </td>
                    <td className={`${CELL} c:ink/70 ff:body`}>{line.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
