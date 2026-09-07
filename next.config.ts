import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Built in CI; `standalone` emits a self-contained `.next/standalone`
  // (server.js + traced node_modules) that the server runs as-is.
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c601633.parspack.net",
      },
    ],
  },
};

export default nextConfig;
