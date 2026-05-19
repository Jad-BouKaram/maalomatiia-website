import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — another lockfile exists in a
  // parent directory, which would otherwise be inferred as the root.
  turbopack: {
    root: path.resolve(),
  },
};

export default nextConfig;
