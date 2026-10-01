import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.DEV_PORT!],
  reactCompiler: true,
}

export default nextConfig
