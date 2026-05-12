import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin · Sanity Content",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

// Embed Sanity Studio trong iframe để edit content trực tiếp trong admin panel.
// /account/admin/content              -> studio root
// /account/admin/content/post         -> desk view post
// /account/admin/content/post/<id>    -> edit specific doc

export default async function AdminContentPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = (slug || []).join("/");
  const studioUrl = path ? `/studio/desk/${path}` : "/studio";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="t-h2 text-white mb-1">Sanity Content</h1>
          <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
            Edit blog, products, vouchers, settings trực tiếp tại đây.
          </p>
        </div>
        <Link
          href={studioUrl}
          target="_blank"
          rel="noopener"
          className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold text-white/85 border"
          style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
        >
          Mở tab mới
        </Link>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <iframe
          src={studioUrl}
          className="w-full"
          style={{ height: "calc(100vh - 220px)", minHeight: "640px", border: "none", background: "#0a0e1a" }}
          allow="clipboard-read; clipboard-write"
        />
      </div>

      <div className="text-[0.75rem]" style={{ color: "var(--ink-mute)" }}>
        Nếu studio không load: <Link href="/studio" target="_blank" className="underline" style={{ color: "#7da9ff" }}>mở /studio trong tab mới</Link> để đăng nhập Sanity trước.
      </div>
    </div>
  );
}
