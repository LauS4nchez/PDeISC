// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // backend Strapi
        port: "1337",          // puerto
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
