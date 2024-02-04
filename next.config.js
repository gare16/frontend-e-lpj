/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/dashboard/dashboard",
      },
    ];
  },
};

module.exports = nextConfig;
