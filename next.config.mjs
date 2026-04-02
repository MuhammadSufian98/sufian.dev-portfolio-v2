/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/assets/**",
        search: "?v=20260401",
      },
      {
        pathname: "/banner/**",
      },
      {
        pathname: "/icons/**",
      },
      {
        pathname: "/blobs/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
