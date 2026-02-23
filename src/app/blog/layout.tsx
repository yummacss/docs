import Navbar from "@/components/ui/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh c-white" style={{ backgroundColor: "#151724" }}>
      <Navbar />
      <main className="mx-auto px-6 sm-xxl">{children}</main>
    </div>
  );
}
