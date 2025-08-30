/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "edit.marvinmarvinproductions.com",
      },
      {
        hostname: "pocketbase-production-1aa6.up.railway.app",
      },
    ],
  },
};

module.exports = nextConfig;
