import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import RemoveBgClient from "./RemoveBgClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test - RemoveBgClient",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 40, color: "#fff", background: "var(--bg-base)", minHeight: "100vh", marginTop: 80 }}>
        <GradientBlobs />
        <h1>Test with RemoveBgClient</h1>
        <RemoveBgClient />
      </main>
      <Footer />
    </>
  );
}
