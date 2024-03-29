/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "edit.marvinmarvinproductions.com",
      },
    ],
  },
};

module.exports = nextConfig;
