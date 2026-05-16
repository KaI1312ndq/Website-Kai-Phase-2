import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import TestClient from "./TestClient";

export const metadata = {
  title: "Test",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 40, color: "#fff", background: "var(--bg-base)", minHeight: "100vh", marginTop: 80 }}>
        <GradientBlobs />
        <h1>Test TestClient - no force-dynamic</h1>
        <TestClient />
      </main>
      <Footer />
    </>
  );
}
