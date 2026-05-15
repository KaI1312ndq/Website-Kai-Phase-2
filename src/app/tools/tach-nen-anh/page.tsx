import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 40, color: "#fff", background: "#000", minHeight: "100vh", marginTop: 80 }}>
        <h1>Test - Navbar + Footer</h1>
      </main>
      <Footer />
    </>
  );
}
