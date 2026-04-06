export default function MediaQueriesBase() {
  return (
    <>
      <p className="d-b p-4 c-slate sm:d-none">Small screen</p>
      <p className="d-none md:d-none p-4 c-slate sm:d-b">Medium screen</p>
      <p className="d-none lg:d-none p-4 c-slate md:d-b">Large screen</p>
      <p className="d-none xl:d-none p-4 c-slate ta-c lg:d-b">Extra large screen</p>
      <p className="d-none p-4 c-slate ta-c xxl:d-b">Double extra large screen</p>
    </>
  );
}
