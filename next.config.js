/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollTrigger: true,
  },
  images: {
    domains: ['rannxyz.vercel.app', 'api.github.com'],
  },
}

module.exports = nextConfig
