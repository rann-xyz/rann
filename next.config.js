/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rannxyz.vercel.app', 'api.github.com'],
  },
  // Disable ESLint during build to avoid worker conflicts
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig