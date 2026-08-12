/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["import"],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/keystatic",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
