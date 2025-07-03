import { createSignal, createEffect } from "solid-js";

export default function Class(props: { name: string }) {
  const [data, setData] = createSignal<any[]>([]);
  const [errMsg, setErrMsg] = createSignal("");

  createEffect(() => {
    if (!props.name || typeof props.name !== "string") {
      setErrMsg("Invalid or missing 'name' property");
      setData([]);
      return;
    }
    const slug = encodeURIComponent(props.name);
    fetch(`https://get.yummacss.com/api/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`The API responded with: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        setErrMsg(err instanceof Error ? err.message : String(err));
        setData([]);
      });
  });

  return (
    <div class="max-h-90 o-y-auto mb-5">
      <table>
        <thead>
          <tr>
            <th class="fs-md fw-600">Utility</th>
            <th class="fs-md fw-600">Properties</th>
          </tr>
        </thead>
        <tbody>
          {data().length > 0 ? (
            data().map((item: { utility: string; property: string[] }) => (
              <tr>
                <td>
                  <p class="fs-sm">{item.utility}</p>
                </td>
                <td>
                  <code>{item.property.join(" ")}</code>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan={2} title={errMsg()}>
                Failed to load data. Please try again later.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
