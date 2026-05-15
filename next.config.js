/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 301 permanent redirect non-www -> www (Googlebot follows 301, not 307)
      {
        source: "/:path*",
        has: [{ type: "host", value: "nguyenducquang.website" }],
        destination: "https://www.nguyenducquang.website/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Compression + perf
  compress: true,
  poweredByHeader: false,
  // Transformers.js / ONNX runtime - tránh resolve sharp/onnxruntime-node trong browser bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false, path: false, sharp: false,
        "onnxruntime-node": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
