import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.DEV_PORT!],
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
