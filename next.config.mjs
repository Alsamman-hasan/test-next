/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://jsonplaceholder.typicode.com",
  },
  experimental: {
    optimizePackageImports: [
      '@mui/material',
    ],
  }
};

export default nextConfig;
