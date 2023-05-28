/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "edit.marvinmarvinproductions.com",
      },
    ],
  },
};

module.exports = nextConfig;
