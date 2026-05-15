import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test - Tách nền ảnh",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 40, color: "#fff", background: "var(--bg-base)", minHeight: "100vh" }}>
        <GradientBlobs />
        <h1>Test - Navbar/Footer/Blobs loaded, no RemoveBgClient</h1>
      </main>
      <Footer />
    </>
  );
}
