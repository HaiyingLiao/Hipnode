/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'hipnode-bucket.s3.amazonaws.com',
        pathname: '/*',
        protocol: 'https'
      },
      {
        hostname: 'img.clerk.com',
        pathname: '/*',
        protocol: 'https'
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
