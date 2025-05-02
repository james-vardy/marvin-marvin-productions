/** @type {import('next').NextConfig} */
const nextConfig = {
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
