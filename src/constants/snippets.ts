export const tsx = `<div className="d-g g-4 gtc-2 ta-c tc-white">
  <div className="bg-indigo p-4 rad-1">A</div>
  <div className="bg-indigo p-4 rad-1">B</div>
  <div className="bg-indigo p-4 rad-1">C</div>
</div>`;
export const css = `.d-g {
    display: grid;
}
.g-4 {
    gap: 1rem;
}
.gtc-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}`;
