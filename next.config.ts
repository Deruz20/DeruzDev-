import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['cdn.sanity.io'],
    unoptimized: true,
  },
};

export default nextConfig;
