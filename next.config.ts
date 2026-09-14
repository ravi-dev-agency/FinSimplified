import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ignore directories that tools write into while the dev server runs.
  // Without this the watcher sees its own screenshots and logs, recompiles,
  // produces more output, and recompiles again — a loop that pegs a CPU core
  // and makes every page take seconds to open.
  webpack(config) {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/node_modules/**", "**/.next/**", "**/.playwright-mcp/**"],
    };
    return config;
  },
};

export default nextConfig;
