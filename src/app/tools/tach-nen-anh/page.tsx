import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test - Tách nền ảnh",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 40, color: "#fff", background: "#000", minHeight: "100vh", marginTop: 80 }}>
        <h1>Test - chỉ Navbar</h1>
      </main>
    </>
  );
}
