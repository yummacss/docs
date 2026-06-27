import Navbar from "@/components/ui/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-page c-white">
      <Navbar />
      <main
        className="mx-auto px-6 docs-container"
      >
        {children}
      </main>
    </div>
  );
}
