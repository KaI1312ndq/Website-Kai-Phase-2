export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test - Tách nền ảnh",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main style={{ padding: 40, color: "#fff", background: "#000", minHeight: "100vh" }}>
      <h1>Test page - no imports</h1>
      <p>If this renders, problem is in imports (Navbar/Footer/GradientBlobs/RemoveBgClient).</p>
    </main>
  );
}
