/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        pathname: '/*',
        protocol: 'https'
      }
    ]
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
