import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Explicitly use Webpack (not Turbopack)
  webpack: (config, { isServer }) => {
    // Node.js polyfills for browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    return config;
  },
  // Output configuration for Node.js
  output: "standalone",
  // Image optimization
  images: {
    unoptimized: true,
  },
};

// Conditionally enable bundle analyzer
const config = process.env.ANALYZE === "true"
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;

export default config;
