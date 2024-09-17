import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/notice/detail/0',
        permanent: false,
      },
      {
        source: '/notice',
        destination: '/notice/list/1',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
