/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  env: {
    API_URL: process.env.API_URL,
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
  },
};

module.exports = nextConfig;
