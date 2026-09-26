/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rannxyz.vercel.app', 'api.github.com'],
  },
  // Remove experimental.scrollTrigger as it's not valid
}

module.exports = nextConfig