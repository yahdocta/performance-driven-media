/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  images: {
    domains: ['cdn.sanity.io'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
