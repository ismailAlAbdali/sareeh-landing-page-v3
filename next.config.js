/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false, // Disable SWC minification to avoid build issues
  trailingSlash: true, // Add trailing slash for better Netlify compatibility
  // Remove rewrites as they don't work with static export
};

module.exports = nextConfig;