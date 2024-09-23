/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
        port: "", // Accepts any port
        pathname: "**", // Accepts any path
      },
    ],
  },
};

export default nextConfig;
