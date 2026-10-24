import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/cookies", destination: "/legal/cookies", permanent: true },
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/tos", destination: "/legal/terms", permanent: true },
    ];
  },
};

export default nextConfig;
