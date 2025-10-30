import Navbar from "@/components/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-vh bg-[#151724] tc-white">
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
