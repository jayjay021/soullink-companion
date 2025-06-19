import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Reduce Next.js built-in logging noise
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // Optional: Disable some verbose outputs
  experimental: {
    // Reduce build output verbosity
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
