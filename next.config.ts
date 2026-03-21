import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  /** Hub pages (e.g. /sectors) render many links; default 60s can fail on Vercel. */
  staticPageGenerationTimeout: 180,
  poweredByHeader: false,
  // Evita el warning de "multiple lockfiles" quan hi ha package-lock fora del projecte
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Inline CSS for initial load → fewer render-blocking stylesheet requests (Lighthouse).
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
