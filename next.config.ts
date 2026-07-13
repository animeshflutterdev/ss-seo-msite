import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sastasundar.com",
      }
    ],
  },

async redirects() {
    return [
      {
        source: "/order-medicine/:slug/",
        destination: "/order-medicine/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;