import SwitchMockups from "@/components/playground/switch-mockups";

export const metadata = {
  title: "Switch mockups",
  robots: { index: false, follow: false },
};

/** Internal comparison page for Component API switch track designs. */
export default function SwitchMockupsPage() {
  return (
    <div className="min-h-dvh c-white bg-page">
      <div className="mx-auto px-6 py-12 docs-container max-w-4xl">
        <SwitchMockups />
      </div>
    </div>
  );
}
