/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
  },
};

module.exports = nextConfig;
