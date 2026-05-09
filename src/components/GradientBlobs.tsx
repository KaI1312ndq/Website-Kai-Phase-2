type Blob = {
  className?: string;
  variant?: "blue" | "purple";
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: string;
};

export default function GradientBlobs({ blobs }: { blobs: Blob[] }) {
  return (
    <>
      {blobs.map((b, i) => (
        <div
          key={i}
          aria-hidden
          className={`blob blob-anim ${b.variant === "purple" ? "blob-purple" : "blob-blue"} ${b.className ?? ""}`}
          style={{
            width: b.size ?? 480,
            height: b.size ?? 480,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            animationDelay: b.delay ?? `${i * 1.5}s`,
          }}
        />
      ))}
    </>
  );
}
