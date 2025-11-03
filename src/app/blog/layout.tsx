import Navbar from "@/components/ui/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh tc-white" style={{ backgroundColor: "#151724" }}>
      <Navbar />
      <main
        className="mx-auto px-6"
        style={{ maxWidth: "clamp(40rem, 80vw, 96rem)" }}
      >
        {children}
      </main>
    </div>
  );
}
