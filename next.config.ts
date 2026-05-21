import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/plugins/*': ['./content/plugins/**/*'],
  },
};

export default nextConfig;