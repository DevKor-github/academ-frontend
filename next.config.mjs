/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/notice/0',
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
