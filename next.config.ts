/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['cdn.sanity.io'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
