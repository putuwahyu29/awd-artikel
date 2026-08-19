/**
 * @type {import('next').NextConfig}
 */

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.disqus.com https://*.disquscdn.com https://www.googletagmanager.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.disquscdn.com;
  img-src 'self' data: blob: https: https://res.cloudinary.com https://*.disquscdn.com https://*.disqus.com;
  font-src 'self' data: https://fonts.gstatic.com;
  frame-src 'self' https://*.disqus.com https://www.youtube.com https://www.youtube-nocookie.com;
  connect-src 'self' https: https://*.disqus.com https://*.disquscdn.com https://va.vercel-scripts.com https://vitals.vercel-insights.com;
  media-src 'self' https:;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://*.list-manage.com;
  frame-ancestors 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
